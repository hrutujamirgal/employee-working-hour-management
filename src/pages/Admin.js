import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import "./Admin.css";
import Common from "../components/Common";

// get the local storage data
const getLocalData = () => {
  const list = localStorage.getItem("todoList");

  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

const Admin = () => {
  const [input, setInput] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  // add items in function
  const addItem = () => {
    if (!input) {
      alert("Please fill the Data !");
    } else if (input && toggleButton) {
      setItems(
        items.map((curr) => {
          if (curr.id === isEditItem) {
            return { ...curr, name: input };
          }
          return curr;
        })
      );

      setInput("");
      setIsEditItem(null);
      setToggleButton(false);
    } else {
      const newInput = {
        id: new Date().getTime().toString(),
        name: input,
      };
      setItems([...items, newInput]);
      setInput("");
    }
  };

  // delete items
  const deleteItem = (index) => {
    const updatedItem = items.filter((currentElement) => {
      return currentElement.id !== index;
    });

    setItems(updatedItem);
  };

  // edit items
  const editItem = (index) => {
    const editedItem = items.find((currentElement) => {
      return currentElement.id === index;
    });
    setInput(editedItem.name);
    setIsEditItem(index);
    setToggleButton(true);
  };

  // remove all items
  const removeAll = () => {
    setItems([]);
  };

  // for the local storage
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div class="main">
        {/* <Common /> */}

        <div className="todo">
          <div className="child-div">
            <div className="figure">
              <p className="figcaption">Add Your List of Work to do Here</p>
            </div>
            <div className="addItems">
              <input
                type="text"
                placeholder="✍️ Add Items"
                className="form-control"
                value={input}
                onChange={(event) => setInput(event.target.value)}
              />

              {toggleButton ? (
                <FontAwesomeIcon
                  icon="fa-solid fa-pen-to-square"
                  className="fa-edit"
                  onClick={addItem}
                />
              ) : (
                <FontAwesomeIcon
                  icon="fa-solid fa-plus"
                  className=" fa fa-plus"
                  onClick={addItem}
                />
              )}
            </div>

            <div className="showItems">
              {items.map((current) => {
                return (
                  <div className="eachItem" key={current.id}>
                    <h3>{current.name}</h3>
                    <div className="todo-btn">
                      <FontAwesomeIcon
                        icon="fa-solid fa-pen-to-square"
                        className="fa-edit"
                        onClick={() => editItem(current.id)}
                      />
                      <FontAwesomeIcon
                        icon="fa-solid fa-trash-can"
                        className="fa-trash-alt"
                        onClick={() => deleteItem(current.id)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="showItems">
              <button
                className="btn effect04"
                data-sm-link-text="Remove All"
                onClick={removeAll}
              >
                <span>CHECK LIST</span>
              </button>
            </div>
          </div>
        </div>

        <div className="side">
          <Common />
        </div>
      </div>
    </>
  );
};

export default Admin;
