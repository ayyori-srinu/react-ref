import React, { useState } from "react";
import KeyboardEventHandler from "react-keyboard-event-handler";
import "./Home.css";
const Home = () => {
  const [size, setSize] = useState(null);
  const [selected, setSelected] = useState("0-0");
  const [maxMoves, setMaxMoves] = useState(null);
  const [movesInfo, setMovesinfo] = useState([]);
  const [isSubmitted, setSubmitted] = useState(false);
  const getMatriz = (gridSize) => {
    var matriz = new Array(gridSize).fill("x");
    for (let i = 0; i < gridSize; i++) {
      matriz[i] = new Array(gridSize).fill("y");
    }
    return matriz;
  };

  const matriz = getMatriz(Number(size));
  const handleReset = () => {
    setSize("");
    setMaxMoves("");
    setMovesinfo([]);
    setSubmitted(false);
    setSelected("0-0")
  };
  const handleSize = (value) => {
    if(!isNaN(value)){
      setSize(value);
      setMovesinfo([]);
      setSubmitted(false);
      setSelected("0-0")
    }else{
      setSize(null);
    }
  };
  const handleMaxMoves = (value) => {
    if(!isNaN(value)){
      setMaxMoves(value);
      setMovesinfo([]);
      setSubmitted(false);
      setSelected("0-0")
    }else{
      setSize(null);
    }
   
  };
  const handleSubmit = () => {
    setSubmitted(true);
  };
 
  const getActiveGrid = (keyEvent) => {
    const gridSize = size - 1;
    const selectedGridArr = selected.split("-");
    const selectedRow = Number(selectedGridArr[0]);
    const selectedCol = Number(selectedGridArr[1]);
    switch (keyEvent) {
      case "up": {
        if (selectedRow !== 0) {
          return `${selectedRow - 1}-${selectedCol}`;
        } else {
          return selected;
        }
      }
      case "down":
        if (selectedRow !== gridSize) {
          return `${selectedRow + 1}-${selectedCol}`;
        } else {
          return selected;
        }
      case "right":
        if (selectedRow !== gridSize || selectedCol !== gridSize) {
          if (selectedRow === gridSize) {
            return `${gridSize}-${selectedCol + 1}`;
          } else if (selectedCol === gridSize) {
            return `${selectedRow + 1}-0`;
          } else {
            return `${selectedRow}-${selectedCol + 1}`;
          }
        } else {
          return `0-0`;
        }
      case "left":
        if (selectedRow !== 0 || selectedCol !== 0) {
          if (selectedRow === 0) {
            return `0-${selectedCol - 1}`;
          } else if (selectedCol === 0) {
            return `${selectedRow - 1}-${gridSize}`;
          } else {
            return `${selectedRow}-${selectedCol - 1}`;
          }
        } else {
          return `${gridSize}-${gridSize}`;
        }
      default:
        return "0-0";
    }
  };

  const handleEvent = (key) => {
    if (movesInfo.length < Number(maxMoves)) {
      const selectedGrid = getActiveGrid(key);

      setMovesinfo((movesInfo) => [...movesInfo, selectedGrid]);
      setSelected(selectedGrid);
    }
  };
  return (
    <div>
      <h1>Chess Board</h1>
      <label>Size </label>
      <input
        name="size"
        value={size}
        onChange={(e) => handleSize(e.target.value)}
      />
      <br />
      <label htmlFor="maxMoves">Max Moves </label>
      <input
        name="maxMoves"
        value={maxMoves}
        onChange={(e) => handleMaxMoves(e.target.value)}
      />{" "}
      <br />
      <input
        type="button"
        name="submit"
        value="Submit"
        onClick={handleSubmit}
      />
      <input type="button" name="reset" value="Reset" onClick={handleReset} />
      <KeyboardEventHandler
        handleKeys={["left", "right", "up", "down"]}
        handleFocusableElements
        onKeyEvent={(key) => handleEvent(key)}
      />
      {isSubmitted && (
        <div className="grid-layout">
          {matriz.map((item, indexParent) => {
            return (
              <div className="row" key={indexParent}>
                {item.map((innerItem, index) => {
                  const isSelected =
                    selected === `${indexParent}-${index}` ? "selected" : "";
                  return (
                    <div
                      key={`(${indexParent}-${index})`}
                      className={`coll ${isSelected}`}
                    >
                      {`(${indexParent}-${index})`}{" "}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
      <div>
        {isSubmitted && movesInfo.length === Number(maxMoves) && (
          <>
            <h2>Result</h2>[
            {movesInfo.map((item) => {
              const rowsCols = item.split("-");
              return (
                <span
                  key={`{${rowsCols[0]}, ${rowsCols[1]}}, `}
                >{`{${rowsCols[0]}, ${rowsCols[1]}} `}</span>
              );
            })}
            ]
          </>
        )}
      </div>
    </div>
  );
};
export default Home;
