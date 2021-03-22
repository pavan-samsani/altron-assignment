import "./App.css";
import { useState } from "react";
import React from "react";
import { Modal } from "react-bootstrap";
import graphql from "babel-plugin-relay/macro";
import { useMutation } from "react-relay/hooks";
import { QueryRenderer } from "react-relay";
import RelayEnvironment from "./RelayEnvironment";

const { Suspense } = React;

function FlowBackEnd() {
  const BackendQuery = graphql`
    query flowbackendQuery {
      backEnd {
        id
        name
        skills {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    }
  `;
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [mutate, { loading }] = useMutation(
    graphql`
      mutation flowbackendendMutation($input: IntroduceSkillInput!) {
        introduceSkill(input: $input) {
          skill {
            id
            name
          }
          area {
            name
            id
            skills {
              pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
              }
            }
          }
        }
      }
    `
  );
  const prepElementData = (params) => {
    if (params) {
      const xposition = 250;
      var yposition = 25;
      var elemntsList = [];
      params.map((element) => {
        const elementFrontEnd = {
          id: element.node.id,
          type: "input", // input node
          data: { label: element.node.name },
          position: { x: xposition, y: yposition },
        };
        elemntsList.push(elementFrontEnd);
        yposition = 100 + yposition;
      });
      // console.log(elemntsList);
      return elemntsList;
      // setElementFrontEnd(elemntsList);
    }
  };

  function List() {
    return (
      <QueryRenderer
        environment={RelayEnvironment}
        query={BackendQuery}
        variables={{}}
        render={({ error, props, retry }) => {
          const _elements = prepElementData(props?.backEnd?.skills?.edges);
          return (
            <div>
              <div style={{ height: 500 }}>
                <div>
                  <h1>Backend List</h1>
                  {_elements ? (
                    <div>
                      {_elements.map((node) => {
                        console.log(node);
                        return <div Key={node.id}> {node.data.label} test</div>;
                      })}
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>
          );
        }}
      />
    );
  }

  return (
    <div>
      <div
        className=""
        onClick={() => {
          setShow(true);
        }}
      >
        <QueryRenderer
          environment={RelayEnvironment}
          query={BackendQuery}
          variables={{}}
          render={({ error, props, retry }) => {
            return (
              <div>
                <List></List>
              </div>
            );
          }}
        />
      </div>

      <Modal
        show={show}
        onHide={() => {setShow(false)
          setInputValue('')}}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Add Skill to Backend Area
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <label htmlFor="">Skill Name:</label>
          <br />
          <input
            style={{ width: "100%" }}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <p>
            <button
              class="btn btn-danger btn-block"
              onClick={() => {
                setShow(false);
                setInputValue('');
              }}
            >
              Cancel
            </button>
          </p>
          <p>
            <button
              class="btn btn-success btn-block"
              disabled={!inputValue}
              onClick={() => {
                setShow(false);
                mutate({
                  variables: {
                    input: {
                      skillName: `${inputValue}`,
                      areaId: 2,
                    },
                  },
                  OnCompleted(data) {
                    List();
                  },
                });
              }}
            >
              Save
            </button>
          </p>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default FlowBackEnd;
