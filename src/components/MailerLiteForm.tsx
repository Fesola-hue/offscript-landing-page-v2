import { useEffect } from "react";

export function MailerLiteForm() {
  useEffect(() => {
    // Load webforms script if not already loaded
    if (!document.getElementById("ml-webforms-script")) {
      const script = document.createElement("script");
      script.id = "ml-webforms-script";
      script.src = "https://groot.mailerlite.com/js/w/webforms.min.js?v83147fa8ce2d95cb73ece7f28b469519";
      script.async = true;
      document.body.appendChild(script);
    }

    // Takel fetch
    fetch("https://assets.mailerlite.com/jsonp/2329743/forms/187800923568866888/takel");

    // Success handler
    (window as any).ml_webform_success_41437177 = function () {
      const form = document.querySelector(".ml-subscribe-form-41437177 .row-form") as HTMLElement;
      const success = document.querySelector(".ml-subscribe-form-41437177 .row-success") as HTMLElement;
      if (form) form.style.display = "none";
      if (success) success.style.display = "block";
    };
  }, []);

  return (
    <>
      <style>{`
        @import url("https://assets.mlcdn.com/fonts.css?version=1786699");
        #mlb2-41437177.ml-form-embedContainer { box-sizing: border-box; display: table; margin: 0 auto; position: static; width: 100% !important; }
        #mlb2-41437177.ml-form-embedContainer .ml-form-embedWrapper { background-color: transparent; border-width: 0px; border-color: transparent; border-radius: 4px; border-style: solid; box-sizing: border-box; display: inline-block !important; margin: 0; padding: 0; position: relative; }
        #mlb2-41437177.ml-form-embedContainer .ml-form-embedWrapper.embedForm { max-width: 400px; width: 100%; }
        #mlb2-41437177.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody { padding: 20px 20px 0 20px; }
        #mlb2-41437177.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedContent { text-align: left; margin: 0 0 20px 0; }
        #mlb2-41437177.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedContent h4 { color: #ffffff; font-family: 'Open Sans', Arial, Helvetica, sans-serif; font-size: 20px; font-weight: 700; margin: 0 0 10px 0; }
        #mlb2-41437177.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedContent p { color: rgba(255,255,255,0.6); font-family: 'Open Sans', Arial, Helvetica, sans-serif; font-size: 14px; font-weight: 400; line-height: 20px; margin: 0 0 10px 0; }
        #mlb2-41437177.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody form { margin: 0; width: 100%; }
        #mlb2-41437177.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-formContent { margin: 0 0 20px 0; width: 100%; }
        #mlb2-41437177.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow { margin: 0 0 10px 0; width: 100%; }
        #mlb2-41437177.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow input { background-color: #ffffff !important; color: #333333 !important; border-color: #cccccc; border-radius: 4px !important; border-style: solid !important; border-width: 1px !important; font-family: 'Open Sans', Arial, Helvetica, sans-serif; font-size: 14px !important; height: auto; line-height: 21px !important; margin: 0; padding: 10px !important; width: 100% !important; box-sizing: border-box !important; }
        #mlb2-41437177.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedSubmit { margin: 0 0 20px 0; float: left; width: 100%; }
        #mlb2-41437177.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedSubmit button { background-color: #FF9F1C !important; border: none !important; border-radius: 5px !important; box-shadow: none !important; color: #ffffff !important; cursor: pointer; font-family: 'Open Sans', Arial, Helvetica, sans-serif !important; font-size: 14px !important; font-weight: 700 !important; line-height: 21px !important; height: auto; padding: 10px !important; width: 100% !important; box-sizing: border-box !important; }
        #mlb2-41437177.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedSubmit button:hover { background-color: #333333 !important; }
        #mlb2-41437177.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody { padding: 20px; }
        #mlb2-41437177.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody .ml-form-successContent h4 { color: #ffffff; font-family: 'Open Sans', Arial, Helvetica, sans-serif; font-size: 20px; font-weight: 700; margin: 0 0 10px 0; }
        #mlb2-41437177.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody .ml-form-successContent p { color: rgba(255,255,255,0.6); font-family: 'Open Sans', Arial, Helvetica, sans-serif; font-size: 14px; }
        .ml-form-embedSubmitLoad { display: inline-block; width: 20px; height: 20px; }
        .ml-form-embedSubmitLoad:after { content: " "; display: block; width: 11px; height: 11px; margin: 1px; border-radius: 50%; border: 4px solid #fff; border-color: #ffffff #ffffff #ffffff transparent; animation: ml-form-embedSubmitLoad 1.2s linear infinite; }
        @keyframes ml-form-embedSubmitLoad { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0; }
      `}</style>

      <div id="mlb2-41437177" className="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-41437177">
        <div className="ml-form-align-center">
          <div className="ml-form-embedWrapper embedForm">
            <div className="ml-form-embedBody ml-form-embedBodyDefault row-form">
              <div className="ml-form-embedContent">
                <h4>STAY IN TUNE</h4>
                <p>Weekly drops: news, culture, music, just for you.</p>
              </div>
              <form
                className="ml-block-form"
                action="https://assets.mailerlite.com/jsonp/2329743/forms/187800923568866888/subscribe"
                data-code=""
                method="post"
                target="_blank"
              >
                <div className="ml-form-formContent">
                  <div className="ml-form-fieldRow ml-last-item">
                    <div className="ml-field-group ml-field-email ml-validate-email ml-validate-required">
                      <input
                        aria-label="email"
                        aria-required="true"
                        type="email"
                        className="form-control"
                        name="fields[email]"
                        placeholder="Email"
                        autoComplete="email"
                      />
                    </div>
                  </div>
                </div>
                <input type="hidden" name="ml-submit" value="1" />
                <div className="ml-form-embedSubmit">
                  <button type="submit" className="primary">Subscribe</button>
                  <button disabled style={{ display: "none" }} type="button" className="loading">
                    <div className="ml-form-embedSubmitLoad" />
                    <span className="sr-only">Loading...</span>
                  </button>
                </div>
                <input type="hidden" name="anticsrf" value="true" />
              </form>
            </div>
            <div className="ml-form-successBody row-success" style={{ display: "none" }}>
              <div className="ml-form-successContent">
                <h4>Thank you!</h4>
                <p>You have successfully joined our subscriber list.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
