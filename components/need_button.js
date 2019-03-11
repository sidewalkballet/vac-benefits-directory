import React, { Component } from "react";
import PropTypes from "prop-types";
import Checkbox from "./checkbox";
import { connect } from "react-redux";
import { logEvent } from "../utils/analytics";
import { css } from "emotion";
import Router from "next/router";

const style = css`
  margin-bottom: 10px;
  margin-right: 10px;
`;

export class NeedButton extends Component {
  handleClick = id => {
    let newSelectedNeeds = JSON.parse(JSON.stringify(this.props.selectedNeeds));
    if (newSelectedNeeds.hasOwnProperty(id)) {
      delete newSelectedNeeds[id];
    } else {
      logEvent("FilterClick", "need", id);
      newSelectedNeeds[id] = id;
    }
    this.props.setSelectedNeeds(newSelectedNeeds);

    if (this.props.updateUrl) {
      this.props.url.query["needs"] = newSelectedNeeds;
      console.log(this.props.url);
      Router.replace(this.props.url);
    }
  };

  render() {
    const { t, need, disabled } = this.props;
    return (
      <Checkbox
        checked={this.props.selectedNeeds[need.id] !== undefined}
        onChange={() => this.handleClick(need.id)}
        value={need.id}
        disabled={disabled ? "disabled" : null}
        className={style}
      >
        {t("current-language-code") === "en" ? need.nameEn : need.nameFr}
      </Checkbox>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setSelectedNeeds: needsObject => {
      dispatch({ type: "SET_SELECTED_NEEDS", data: needsObject });
    }
  };
};

const mapStateToProps = reduxState => {
  return {
    needs: reduxState.needs,
    selectedNeeds: reduxState.selectedNeeds,
    language: reduxState.language
  };
};

NeedButton.propTypes = {
  need: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  setSelectedNeeds: PropTypes.func.isRequired,
  selectedNeeds: PropTypes.object.isRequired,
  disabled: PropTypes.string,
  store: PropTypes.object,
  updateUrl: PropTypes.bool,
  url: PropTypes.object
};

NeedButton.defaultProps = {
  disabled: "",
  updateUrl: false
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NeedButton);
