import { Databuddy } from "@databuddy/sdk/react";

export function DatabuddyAnalytics() {
  return (
    <>
      {process.env.NEXT_PUBLIC_DATABUDDY_CLIENT_ID && (
        <Databuddy
          clientId={process.env.NEXT_PUBLIC_DATABUDDY_CLIENT_ID}
          enableBatching={true}
        />
      )}
    </>
  );
}
