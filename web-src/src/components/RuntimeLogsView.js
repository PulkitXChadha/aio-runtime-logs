/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Grid, View, Flex, Heading, Divider } from "@adobe/react-spectrum";

import ActivationList from "./ActivationList";
import ActivationLog from "./ActivationLog";

const RuntimeLogsView = (props) => {
  const [activationID, setActivationID] = useState();

  let activationListContent = null;
  let activationLogContent = null;
  activationListContent = (
    <ActivationList
      ims={props.ims}
      onSelection={(activationId) => {
        setActivationID(activationId);
      }}
    />
  );

  if (activationID) {
    activationLogContent = (
      <ActivationLog
        key={activationID}
        ims={props.ims}
        activationID={activationID}
      />
    );
  }
  let headerContent = (
    <Grid
      areas={["header header header header addButton"]}
      columns={["1fr", "1fr", "1fr", "1fr", "1fr"]}
      rows={["size-600"]}
      height="100%"
      columnGap="size-300"
    >
      <View gridArea="header">
        <Heading level={3}>Runtime Activation Logs</Heading>
      </View>
    </Grid>
  );

  let mainContent = (
    <Grid
      areas={["activationList activationLog activationLog activationLog "]}
      columns={["1fr", "1fr", "1fr", "1fr"]}
      rows={["auto"]}
      columnGap="size-50"
    >
      <View
        gridArea="activationList"
        overflow="auto"
        height="100%"
        backgroundColor="gray-50"
      >
        {activationListContent}
      </View>
      <View
        gridArea="activationLog"
        overflow="auto"
        height="100%"
        backgroundColor="gray-50"
      >
        {activationLogContent}
      </View>
    </Grid>
  );

  return (
    <Flex direction="column" gap="size-50">
      {headerContent}
      <Divider size="M" />
      {mainContent}
    </Flex>
  );
};

RuntimeLogsView.propTypes = {
  runtime: PropTypes.any,
  ims: PropTypes.any,
};

export default RuntimeLogsView;
