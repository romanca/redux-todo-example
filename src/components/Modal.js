import React, { useState } from "react";
import Dialog from "./Dialog";
import { Pane, Dialog as DialogRaw } from "evergreen-ui";
import Component from "@reactions/component";

// const Button = ({ label, onClick, backgroundColor }) => {
//   return (
//     <button style={{ backgroundColor }} onClick={onClick}>
//       {label}
//     </button>
//   );
// };

const Modal = ({ modalContent, onRequestClose, visible }) => {
  const {
    title,
    content,
    actions,
    validate,
    small,
    initialValues,
  } = modalContent;

  const [contentValues, setContentValues] = useState({});
  const [errors, setErrors] = useState({});
  const [submitAttempt, setSubmitAttempt] = useState(false);

  const onContentValuesChange = (values) => {
    let newErrors = null;
    if (validate) {
      newErrors = validate(values);
      setErrors(newErrors);
    }
    setContentValues(values);
  };

  const getActionClickHandler = (action) => () => {
    if (action.type === "CONTENT_CONFIRMATION") {
      setSubmitAttempt(true);
      let newErrors = null;
      if (validate) {
        newErrors = validate(contentValues);
        setErrors(newErrors);
      }
      action.onClick({ values: contentValues, errors: newErrors });
    } else {
      if (action.onClick) {
        action.onClick();
      }
    }
    if (action.requestClose) {
      onRequestClose();
    }
  };

  return (
    <Component initialState={{ isShown: true }}>
      {({ state, setState }) => (
        <Pane>
          <DialogRaw
            isShown={state.isShown}
            confirmLabel='submit'
            title={modalContent.title}>
            {/* {content &&
              content({
                actions,
                onContentValuesChange,
                errors: submitAttempt ? errors : {},
                initialValues,
              })} */}
          </DialogRaw>

          {/* <Button onClick={() => setState({ isShown: true })}>
            Show Dialog
          </Button> */}
        </Pane>
      )}
    </Component>
    // <div
    //   style={{
    //     transition: "opacity 0.1s",
    //     opacity: visible ? 1 : 0,
    //     position: "absolute",
    //     width: "100%",
    //     height: "100%",
    //     backgroundColor: "rgba(0,0,0,0.49)",
    //     zIndex: 9,
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "center",
    //   }}>
    //   <div
    //     style={{
    //       width: small ? 200 : "40%",
    //       height: "fit-content",
    //       minHeight: 150,
    //       backgroundColor: "white",
    //       border: "1 px solid black",
    //       padding: 15,
    //       borderRadius: 15,
    //       display: "flex",
    //       flexDirection: "column",
    //       justifyContent: "space-between",
    //     }}>
    //     <h3
    //       style={{
    //         width: "100%",
    //         borderBottom: "1px solid black",
    //         paddingBottom: 5,
    //       }}>
    //       {title}
    //     </h3>
    //     <div style={{ flex: 1, paddingBottom: 20 }}>
    //       {content &&
    //         content({
    //           actions,
    //           onContentValuesChange,
    //           errors: submitAttempt ? errors : {},
    //           initialValues,
    //         })}
    //     </div>
    //     <div
    //       style={{
    //         borderTop: "1px solid black",
    //         paddingTop: 5,
    //         display: "flex",
    //         justifyContent: "flex-end",
    //       }}>
    //       {actions.map((i, index) => (
    //         <div key={index} style={{ marginRight: 5 }}>
    //           <Button
    //             backgroundColor={i.color}
    //             label={i.label}
    //             onClick={getActionClickHandler(i)}
    //           />
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </div>
  );
};

export default Modal;

// import React from "react";
// import ReactDOM from "react-dom";
// import Component from "@reactions/component";
// import { Pane, Dialog, Button, TextInput } from "evergreen-ui";

// import "./styles.css";

// class AddProjectDialog extends React.Component {
//   state = {
//     textValue: ""
//   };

//   handleConfirm = () => {
//     this.props.onRequestClose();
//     alert(JSON.stringify(this.state, null, 2));
//   };

//   render() {
//     const { isShown, onRequestClose } = this.props;
//     const { textValue } = this.state;
//     return (
//       <Dialog
//         isShown={isShown}
//         title="Dialog title"
//         onCloseComplete={onRequestClose}
//         confirmLabel="Add Project"
//         onConfirm={this.handleConfirm}
//       >
//         <TextInput
//           onChange={(e) => this.setState({ textValue: e.target.value })}
//           value={textValue}
//         />
//       </Dialog>
//     );
//   }
// }

// const MyProjectDialog = () => {
//   return (
//     <Component initialState={{ isShown: false }}>
//       {({ state, setState }) => (
//         <Pane>
//           <AddProjectDialog
//             isShown={state.isShown}
//             onRequestClose={() => setState({ isShown: false })}
//           />
//           <Button onClick={() => setState({ isShown: true })}>
//             Show Dialog
//           </Button>
//         </Pane>
//       )}
//     </Component>
//   );
// };

// function App() {
//   return (
//     <div>
//       <MyProjectDialog />
//     </div>
//   );
// }

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
