import Head from "next/head";
import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import unlockProtocolConfig from "../unlockProtocolConfig";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import { useAppContext } from "../utils/context";

export default function Home() {
  const {isMember, setMember} = useAppContext();

  useEffect(() => {
    window.addEventListener("unlockProtocol.status", function (event: any) {
      setMember(event.detail.state == "unlocked");
    });
  });

  const unlockTag = {
    __html: `
    (function(d, s) {
      var js = d.createElement(s),
      sc = d.getElementsByTagName(s)[0];
      js.src="https://paywall.unlock-protocol.com/static/unlock.latest.min.js";
      sc.parentNode.insertBefore(js, sc); }(document, "script"))`,
  };
  const unlockConfigTag = {
    __html: `
    var unlockProtocolConfig = ${JSON.stringify(unlockProtocolConfig)}`,
  };

  const loadCheckoutModel = () => {
    (window as any).unlockProtocol && (window as any).unlockProtocol.loadCheckoutModal();
  };

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
        <script dangerouslySetInnerHTML={unlockTag} />
        <script dangerouslySetInnerHTML={unlockConfigTag} />
      </Head>
      <section className={utilStyles.headingMd}>
        {!isMember ? (
          <div>
            <p>Members only premium entertainment 🔒</p>
            <Button
              variant="contained"
              color="primary"
              onClick={loadCheckoutModel}
            >
              Join now!
            </Button>
          </div>
        ) : (
          <div>
            <p>Welcome 🎉</p>
            <Link href="/member">
              <Button color="primary">Review the secret!</Button>
            </Link>
          </div>
        )}
      </section>
    </Layout>
  );
}
