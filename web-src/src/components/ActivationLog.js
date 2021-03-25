/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import PropTypes from "prop-types";
import {
  Text,
  ProgressCircle,
  TextArea,
  View,
  Grid,
} from "@adobe/react-spectrum";

import ReactJson from "react-json-view";
import { useActionWebInvoke } from "../hooks/useActionWebInvoke";

const ActivationLog = (props) => {
  let headers = {};
  if (props.ims.token && !headers.authorization) {
    headers.authorization = `Bearer ${props.ims.token}`;
  }
  if (props.ims.org && !headers["x-gw-ims-org-id"]) {
    headers["x-gw-ims-org-id"] = props.ims.org;
  }

  let activationLog = useActionWebInvoke({
    actionName: "get-activation-log",
    headers: headers,
    params: {
      activationID: props.activationID,
    },
  });

  let activationLogContent = (
    <ProgressCircle
      id="activation-log-progress-circle"
      aria-label="Getting Activation Log"
      isIndeterminate
      isHidden={!activationLog.isLoading}
      marginStart="size-100"
    />
  );

  if (!activationLog.isLoading && activationLog.error) {
    activationLogContent = <Text>No Activation Logs Found</Text>;
  }
  if (!activationLog.data && !activationLog.error && !activationLog.isLoading) {
    activationLogContent = <Text>No Activation Logs Found</Text>;
  }
  if (!activationLog.isLoading && activationLog.data) {
    activationLogContent = (
      <div
        css={css`
          height: calc(100vh - 80px);
          overflow: auto;
        `}
      >
        <Grid
          areas={["activationLog", "activationResult"]}
          rows={["30%", "70%"]}
          height="100%"
          columnGap="size-50"
        >
          <View
            gridArea="activationLog"
            overflow="auto"
            height="100%"
            backgroundColor="gray-50"
          >
            <TextArea
              isReadOnly={true}
              label="Logs"
              width="100%"
              maxWidth="100%"
              height="100%"
              value={activationLog.data.logs.map((line) => {
                console.log(line);
                return `${line}\n`;
              })}
            />
          </View>
          <View
            gridArea="activationResult"
            overflow="auto"
            height="100%"
            backgroundColor="gray-50"
          >
            <ReactJson
              theme="rjv-default"
              src={activationLog.data.result}
              name="response"
              displayObjectSize={false}
              displayDataTypes={false}
              quotesOnKeys={false}
            />
          </View>
        </Grid>
      </div>
    );
  }

  return activationLogContent;
};

ActivationLog.propTypes = {
  runtime: PropTypes.any,
  ims: PropTypes.any,
};

export default ActivationLog;
