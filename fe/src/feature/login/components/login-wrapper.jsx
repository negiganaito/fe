/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { WorkSigninPasswordTextBox, WorkSigninTextBox } from "@/faang/text-box";
import stylex from "@stylexjs/stylex";
import { Link } from "@tanstack/react-router";
import React from "react";

// eslint-disable-next-line no-unused-vars
const styles = stylex.create({
  globalContainer: {
    width: "100%",
    margin: "0 auto",
    position: "relative",
  },
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },

  "_9kd-": {
    fontFamily: "'Effra', Helvetica, sans-serif!important",
    fontSize: "48px",
    // eslint-disable-next-line @stylexjs/valid-styles
    fontWeight: "100 !important",
    lineHeight: "120%",
    textAlign: "center",
  },

  _9gps: {
    fontSize: "12px",
    fontWeight: "bold",
    textAlign: "center",
  },

  _8hzl: {
    // eslint-disable-next-line @stylexjs/valid-styles
    "--focus-ring-blue": "#1763cf",
    // eslint-disable-next-line @stylexjs/valid-styles
    "--input-label-color-highlighted": "#1763cf",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "16px",
    maxWidth: "360px",
    width: "100%",
  },

  button: {
    cursor: "pointer",
    display: "inline-block",
    textDecoration: "none",
    whiteSpace: "nowrap",
    WebkitFontSmoothing: "antialiased",
    position: "relative",
    textAlign: "center",
    verticalAlign: "middle",
    // eslint-disable-next-line @stylexjs/valid-styles
    transition:
      "200ms cubic-bezier(.08,.52,.52,1) background-color, 200ms cubic-bezier(.08,.52,.52,1) box-shadow, 200ms cubic-bezier(.08,.52,.52,1) transform",

    lineHeight: "22px",
    //

    backgroundColor: "#1763cf",
    borderWidth: "1px",
    borderColor: "#1763cf",
    borderStyle: "solid",
    borderRadius: "6px",
    boxShadow: "none",
    boxSizing: "border-box",
    color: "#fff",
    fontFamily: "SFProDisplay-Bold, Segoe UI, Arial, sans-serif!important",
    fontSize: "17px",
    fontWeight: "normal",
    height: "40px",
    letterSpacing: "normal",
    overflow: "hidden",
    padding: "0 12px",
    textOverflow: "ellipsis",
    textShadow: "none",
    width: "100%",
  },

  spacing: {
    marginBottom: "80px",
  },
});

export const LoginWrapper = () => {
  return (
    <div className={stylex(styles.globalContainer)} id="globalContainer">
      <div className={stylex(styles.root)}>
        <div className={stylex(styles.spacing)} />
        <div
          className={stylex(styles["_9kd-"])}
          data-testid="work_landing_title"
        >
          Welcome back
        </div>
        <div
          className={stylex(styles._9gps)}
          style={{
            fontWeight: "normal",
          }}
        >
          Enter your Workplace password to continue
        </div>
        <div className={stylex(styles._8hzl)} style={{ marginTop: "24px" }}>
          <form
            action="/login/"
            id="login_form"
            method="post"
            data-testid="login_username_password_form"
          >
            <div>
              <WorkSigninTextBox
                autoFocus={false}
                dataTestId="login_username"
                disabled={false}
                label="Email or username"
                name="email"
                required={false}
                type="text"
                value=""
              />
            </div>
            <div style={{ marginTop: "16px" }}>
              <div style={{ maxHeight: "56px" }}>
                <WorkSigninPasswordTextBox
                  autoFocus={false}
                  dataTestId="login_password"
                  disabled={false}
                  label="Password"
                  name="pass"
                  type="password"
                  value=""
                />
              </div>
            </div>

            <div style={{ marginTop: " 16px" }}>
              <Link
                href="/forgot-password"
                style={{
                  color: "#1877F2",
                  fontWeight: 600,
                }}
                data-testid="login_forgot_password"
              >
                Forgot your password?
              </Link>
            </div>

            <div style={{ marginTop: " 16px" }}>
              <button
                className={stylex(styles.button)}
                value="1"
                // className="_42ft _4jy0 _8h-b _4jy3 _4jy1 selected _51sy"
                data-testid="login_button"
                type="submit"
                id="u_0_3_8g"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
