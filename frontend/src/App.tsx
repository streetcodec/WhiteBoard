import Whiteboard from "./components/whiteboard";

function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width:"100vw",
        backgroundColor: "#ffffff",
      }}
    >
      <Whiteboard />
    </div>
  );
}

export default App;
