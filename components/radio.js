import PropTypes from "prop-types";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { globalTheme } from "../theme";

const rootStyle = css({
  display: "block",
  position: "relative",
  padding: "0 0 0 28px",
  marginBottom: "2px"
});

const inputStyle = css({
  position: "absolute",
  cursor: "pointer",
  left: 0,
  top: 0,
  width: "25px",
  height: "25px",
  zIndex: 1,
  margin: 0,
  zoom: 1,
  opacity: 0,
  ":checked + label::after": {
    opacity: 1
  },
  ":focus + label::before": {
    boxShadow: `0 0 0 3px ${globalTheme.colour.focusColour};`
  }
});

const labelStyle = css({
  fontFamily: globalTheme.fontFamilySerif,
  color: globalTheme.colour.greyishBrown,
  fontWeight: 300,
  textTransform: "none",
  fontSize: "24px",
  lineHeight: "1.25",
  cursor: "pointer",
  padding: "0px 10px 15px 12px",
  display: "block",
  ":before": {
    content: "''",
    boxSizing: "border-box",
    position: "absolute",
    top: 0,
    left: 0,
    width: "28px",
    height: "28px",
    border: "2px solid black",
    borderRadius: "50%",
    background: "transparent"
  },
  ":after": {
    content: "''",
    position: "absolute",
    top: "7px",
    left: "7px",
    width: 0,
    height: 0,
    border: "7px solid",
    borderRadius: "50%",
    opacity: 0
  }
});

const mobileLabelStyle = css`
  @media only screen and (max-width: ${globalTheme.max.xs}) {
    font-size: 16px;
  }
`;

const Radio = ({ children, css, value, ...input }) => (
  <div css={[rootStyle, css]}>
    <input
      type="radio"
      css={inputStyle}
      value={value}
      id={value + "-0"}
      {...input}
    />
    <label css={[mobileLabelStyle, labelStyle]} htmlFor={value + "-0"}>
      {children}
    </label>
  </div>
);

Radio.defaultProps = {
  css: undefined
};

Radio.propTypes = {
  css: PropTypes.string,
  value: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default Radio;
