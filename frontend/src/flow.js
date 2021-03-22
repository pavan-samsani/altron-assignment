import "./App.css";
import { useEffect, useState } from "react";
import { Button, ListGroup, Modal } from "react-bootstrap";
import ReactFlow, { Controls, MiniMap, Background } from "react-flow-renderer";
import FlowFrontEnd from "./flowfrontend";
import FlowBackEnd from "./flowbackend";
import flowbackendQuery from "./__generated__/flowfrontendQuery.graphql";
import {
  RelayEnvironmentProvider,
  loadQuery,
  usePreloadedQuery,
} from "react-relay/hooks";
import RelayEnvironment from "./RelayEnvironment";
function ViewFlow() {
  function FlowFrontEndView() {
    return <FlowFrontEnd></FlowFrontEnd>;
  }
  return (
    <div>
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-6" style={{ height: 500 }}>
            <RelayEnvironmentProvider environment={RelayEnvironment}>
              <FlowFrontEndView></FlowFrontEndView>
            </RelayEnvironmentProvider>
          </div>
          <div className="col-md-6" style={{ height: 500 }}>
          <RelayEnvironmentProvider environment={RelayEnvironment}>
            <FlowBackEnd ></FlowBackEnd>
            </RelayEnvironmentProvider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewFlow;
