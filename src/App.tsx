import "./App.css";
import Card, {
  Actions,
  Footer,
  Header,
} from "./components/Card/OrchistrationCompound-SimpleCard";

import NamedCard, {
  Actions as NamedActions,
  Footer as NamedFooter,
  Header as NamedHeader,
} from "./components/Card/NamedSlots-SimpleCard";

// import TypedCard, {
//   Actions as TypedActions,
//   Footer as TypedFooter,
//   Header as TypedHeader,
// } from "./components/Card/TypedCompound-SimpleCard";

import ControlledCard, {
  Actions as TypedActions,
  Footer as TypedFooter,
  Header as TypedHeader,
} from "./components/Card/ControlledCompound-SimpleCard";

function App() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">SimpleCard</h1>
      <div className="card">
        <Card>
          <Header className="text-3xl">Title</Header>

          <p>Content</p>
          <p>Second content</p>

          <Footer>
            <button onClick={() => alert("I got clicked!")}>
              original button
            </button>
          </Footer>

          <Actions>
            <button onClick={() => alert("I got clicked!")}>
              action button
            </button>
          </Actions>
        </Card>
      </div>

      <h1 className="text-3xl font-bold underline">Named</h1>
      <div className="card">
        <NamedCard
          slots={{
            Header: <NamedHeader>Title</NamedHeader>,
            Footer: (
              <NamedFooter>
                <button onClick={() => alert("I got clicked!")}>
                  original button
                </button>
              </NamedFooter>
            ),
          }}
        >
          <p>Content</p>
          <p>Second content</p>
        </NamedCard>
      </div>

      {/* <h1 className="text-3xl font-bold underline">Typed</h1>
      <div className="card">
        <TypedCard>
          <TypedHeader className="text-3xl">Title</TypedHeader>

          <p>Content</p>
          <p>Second content</p>

          <TypedFooter>
            <button onClick={() => alert("I got clicked!")}>
              original button
            </button>
          </TypedFooter>
        </TypedCard>
      </div> */}

      <div className="card">
        <ControlledCard>
          <TypedHeader className="text-3xl">Title</TypedHeader>

          {/* <p>Content</p>
          <p>Second content</p> */}

          <TypedFooter>
            {/* <button onClick={() => alert("I got clicked!")}>
              original button
            </button> */}
          </TypedFooter>
        </ControlledCard>
      </div>
    </>
  );
}

export default App;
