# Compounding

Exploring the various ways the compound component patterns are applied within th react domain.

## The Problem

As a great poet once said _"he, it is me, I am the problem"_. There are a lot of great approaches and industry standards as it comes to compound components. My problem has to do, in most cases, with lack control and predictability.

## The Search

In my search on how to apply control I looked into a few common practices around compound components, there are a lot of great articles on this. I will just touch lightly on each, mainly focussing on how they apply control:

### Dot-notation

This method exposes sub-components in the same namespace, and in most cases from a single import. Hinting to the developer that main the first layer of orchestration is managed via those strict set of available components. This method also complies the most to the react pattern of component composability.

```js
import card from "./card"

<Card>
  <Card.Header>Title of the card<Card.Header>
  <Card.Footer>
    <button>Save</button>
  <Card.Footer>
</Card>
```

Pros:

- Similar name-space provides suggested structure
- good DXP; IDE Intellisense often helps the developer make choices.

Cons:

- No sense of order, other then naming conventions. Putting `<Footer/>` can mess things up or is magically fixed by the parent component.
- No sense of meaning; (magic) sub-components are either unique (slots) or wrapper components around other components.
- No sense of limit; not clear that some component might not be rendered or will mess up rendering
- Some tree-shaking and package-size issue with this method [^1] can occur.

### Named Props

This method makes the function of the subcomponent more explicit and and makes the order irrelevant. Explicit props or prop object are exposed where the developer can provide their components.

```js
import card from "./card";

<Card
  header={<Heading as="h2">Title of the card</Heading>}
  footer={
    <Group>
      <button>Save</button>
    </Group>
  }
>
  <p>Main content of the components (optional, could also be a prop)</p>
</Card>;
```

Pros:

- Structure and order of things are handled by the component
- Expected options (often provided by intellisense) are clear and explicit

Cons:

- No sense of meaning; Not always clear what the expected input is (or limits are)
- No type safety; when components types or not very distinct typescript wont warn for improper use.

### Slots

A sort of hybrid method in which children are marked for their intended use.

```js
import card from "./card"

<Card>
  <Slot name="header"><Heading as='h2'>Title of the card</Heading></Slot>
  <div slot="footer"><button>Close</button></div> (<-- common alternative)
  <div asFooter><button>Close</button></div> (<-- alternative pattern)
</Card>
```

Pros:

- Structure and order of things are handled by the component
- Function and meaning are explicit and no magic component wrapping.

Cons:

- A lot overhead code needed to make it work; reaching deep into the components itself.
- Markup not very intuitive to developers.
- Intellisense support is hard to get right

## The Plan

So looking into these solution on how to do compound components and seeing the pros and cons of each method. To apply some sort of control to enhance developer experience I would only need to fix:

1. Enforce a limiting set of allowed sub-components.
1. Enact some sort of order onto child-components structure.
1. Enforce meaning by allowing for use of direct primitives instead of cloned components.

I do like the dot-notation because it also applies to the react composability pattern correctly where child-components make up the structure and properties apply to the component's variations.

## The Disappointments

The most likely and optimal solution towards the first two is to leverage typescript; it will warn the developer ahead of build time that he is doing or using something which is not allowed. I found an excellent [this article](https://www.totaltypescript.com/|) on **TotalTypescript** which gracefully points out that type safety for react children is not possible.

The third one is not as straight forward and depends a bit on the use-case. Sometimes the component acts as a `slot` and sometimes as a `clone`. So meaning and structure are different depending on how you use it.

For instance

```js
<Card.Content>
  <p>my elobrate multi tag/component content<p>
  <ul>
    <li>some list item</li>
  <ul>
</Card.Content>
```

This is clearly used a `slot` to put you content (ie. children) in, but something like:

```js
<Card.Header>Card title</Card.Header>
```

This is more of component that wraps/clones around a `<Heading>` like primitive component (which maybe enforces some defaults to the Heading component)

## The Solution(s)

### Let the people import?

Optimize the dot-notation by optimize where the imports happen. [^1]. Instead of the component doing to import of all sub components assume de application will do it for you.

```js
// Card.tsx

// Only export (with and without namespace) the available sub components (do not import)
export { CardHeader, CardHeader as Header } from "./components/Header";
export { CardFooter, CardFooter as Footer } from "./components/Footer";
export { CardActions, CardActions as Actions } from "./components/Actions"; // as example here app.js does not import the Actions

// Card as default
export default Card;
```

```js
// app.rsx
import Card, {Header, Footer} from "./card"

<Card>
  <Header>
  <Footer>
</Card>

```

### Let the people know

So if typescript can not help us/prevent us for using a unintended components, we can always bring in our own validation. Only downside the error only occurs on build/run. The basis is of course to not break the component is something is added to make it more robust. But informing the developer something is not needed helps debugging and optimization.

```js
// app.tsx
<Card>
  <Header/>
  <Dialog/>
  <Footer/>
<Card>
```

```js
// Card.tsx

export const Card = (props: CardProps) => {
  const { children } = props;

  const validChildren = React.Children.toArray(children).some(
    (child) =>
      React.isValidElement(child) &&
      ((typeof child.type === "function" &&
        !allowedChildren.includes(child.type.name)) ||
        (typeof child.type === "string" &&
          !allowedChildren.includes(child.type)))
  );

  if (!validChildren)
    throw Error(
      "Stopped processing: Invalid children found in 'Card'. Only allowed children are of type" +
        allowedChildren.toString()
    );

  return (
    <div className="card-parent-styling">
      <div>{Header}</div>
      <div>{children}</div>
      <div>{Footer}</div>
    </div>
  );
};
```

check children and trhow errors -> cons only errors on build/run

Naming conventions - be clear when it is as lot or a component wrapper -> leverage the .notation

## The Elephant in the room

(in code documentation)
Of course writing proper documentation is de main solution here, but we all know how that goes.

## The Conclusion

There are a lot of `what-ifs` and `buts` to considers but it boils down to being consistent in how you approach compound components; the is nog one size fits all.

### Footnotes

[^1]: Tree-shaking is a bit of an issue, importing all components and exposing them via dot-notation makes Node import and build all code. Even if you do not use the component it does not get `shaken` out. (TODO: find link tot article)

```

```
