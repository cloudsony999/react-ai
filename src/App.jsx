import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { URL } from "./constants";

function App() {
  const [question, setQuestion] = useState("");
  const [result,setResult]=useState(undefined)
  const payload = {
    "contents": [
      {
        "parts": [{ "text": question }]
      }]
  }
  const askQuestion = async () => {
    let response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(payload)
    })
    response=await response.json()
    let dataString=response.candidates[0].content.parts[0].text
    dataString=dataString.split("* ")
    dataString=dataString.map((item)=> item.trim())
    console.log(dataString);
    setResult(dataString)
    
  };


  return (
    <div className="grid grid-cols-5 h-screen text-center">
      <div className="col-span-1 bg-amber-300">LEFT SIDE for Navigation</div>
      <div className="col-span-4 bg-amber-50">
        <div className="container h-110">
        {result} 
        </div>
        <div
          className="bg-zinc-800 w-1/2 p-1 pr-5 text-white m-auto
        rounded-2xl border border-zinc-400 flex h-16"
        >
          <input
            type="text"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            className="w-full h-full p-3 outline-null"
            placeholder="Ask me anything!!!"
          />
          <button onClick={askQuestion}>ASK</button>
        </div>
      </div>
    </div>
  );
}

export default App;
