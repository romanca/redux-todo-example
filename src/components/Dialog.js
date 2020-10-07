import React from "react";
import Component from "@reactions/component";
import { Pane, Dialog as DialogRaw, Button } from "evergreen-ui";

export default function Dialog() {
  return (
    <div>
      <Component initialState={{ isShown: false }}>
        {({ state, setState }) => (
          <Pane>
            <DialogRaw
              isShown={state.isShown}
              title='Dialog title'
              onCloseComplete={() => setState({ isShown: false })}
              confirmLabel='Custom Label'>
              Dialog content
            </DialogRaw>

            <Button onClick={() => setState({ isShown: true })}>
              Show Dialog
            </Button>
          </Pane>
        )}
      </Component>
    </div>
  );
}
