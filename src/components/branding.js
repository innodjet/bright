import React, { useState } from "react";
import validator from "validator";
import { BRANDING_MOCK_DATA } from "../mock-data/index";

const Branding = () => {
  const [state, setState] = useState({
    brandingDisplayData: [...BRANDING_MOCK_DATA],
    brandingInputData: [...BRANDING_MOCK_DATA],
    isEdit: false,
    editStatus: {
      isError: false,
      message: "",
    },
  });

  const clear = {
    isEdit: false,
    editStatus: {
      isError: false,
      message: "",
    },
  };

  const handleInputChange = (evt) => {
    evt.preventDefault();
    setState({
      ...state,
      brandingInputData: [
        ...state.brandingInputData.map((el) => {
          if (parseInt(evt.target.id) === el.id) {
            el.value = evt.target.value;
          }
          return el;
        }),
      ],
    });
  };

  const displayData = () => {
    const { brandingDisplayData, brandingInputData, isEdit } = state;
    return brandingDisplayData.map((el, index) => {
      const { id, label, value } = el;
      return (
        <div className="row p-2 mb-3 mt-3" key={id}>
          <div className="col-sm-2">{label}</div>
          <div className="col-sm-10">
            {!isEdit ? (
              value
            ) : (
              <input
                type="text"
                name={brandingInputData[index].label}
                className="form-control"
                id={brandingInputData[index].id}
                onChange={handleInputChange}
                style={{ width: brandingInputData[index].width }}
                value={brandingInputData[index].value}
                placeholder={brandingInputData[index].value}
              />
            )}
          </div>
        </div>
      );
    });
  };

  const {
    isEdit,
    editStatus: { isError, message },
  } = state;

  const onCancel = (evt) => {
    evt.preventDefault();
    setState({
      ...state,
      isEdit: false,
      ...clear,
    });
  };

  const onEdit = (evt) => {
    evt.preventDefault();
    const dataToUpdate = JSON.parse(JSON.stringify(state.brandingDisplayData));
    setState({
      ...state,
      brandingInputData: dataToUpdate,
      isEdit: true,
    });
  };

  const validate = () => {
    return (
      state.brandingInputData.filter((el) => validator.isEmpty(el.value))
        .length === 0
    );
  };

  const onSave = (evt) => {
    evt.preventDefault();
    if (validate()) {
      setState({
        ...state,
        brandingDisplayData: [...state.brandingInputData],
        ...clear,
      });
    } else {
      setState({
        ...state,
        editStatus: {
          ...state.editStatus,
          isError: true,
          message: "All the fields are requiered to perform 'Save Action'...",
        },
      });
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 p-4">
          <h2>Branding</h2>
          set name, welcome page text, and other Branding for your patients to
          see during an exam.
        </div>
        <div className="col-sm-3 p-4">
          {!isEdit ? (
            <button type="button" onClick={onEdit} className="btn btn-link">
              Edit
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={onCancel}
                className="btn btn-link mr-2"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onSave}
                className="btn btn-primary"
              >
                Save
              </button>
            </>
          )}
        </div>
      </div>
      <div className="display-name p-2">
        <h3>Display Name</h3>
        set how the organization name is displayed to patients. in instances
        with limited screen space (emails, mobile views), a shortened name is
        displayed
      </div>
      {isError && message ? (
        <div className="alert alert-danger" role="alert">
          <i className="fas fa-exclamation-triangle"></i> {message}
        </div>
      ) : (
        ""
      )}
      {state && (state.brandingDisplayData || state.brandingInputData)
        ? displayData()
        : ""}
    </div>
  );
};

export default Branding;
