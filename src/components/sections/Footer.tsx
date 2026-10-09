import VideoEmbed from "../VideoEmbed";

export default function Footer() {
  return (
    <footer
      className="container fullContainer noTopMargin padding20-top padding20-bottom padding40H borderSolid cornersAll radius0 shadow0 bgNoRepeat border5px noBorder emptySection"
      id="section--58969"
      data-title="Section"
      style={{
        paddingTop: "30px",
        paddingBottom: "30px",
        backgroundColor: "rgb(11, 11, 11)",
        borderColor: "rgb(255, 227, 0)",
      }}
      aria-label="Legal information"
    >
      <div className="containerInner">
        <div
          className="row bgCover noBorder borderSolid border3px cornersAll radius0 shadow0 P0-top P0-bottom P0H noTopMargin"
          id="row--85710"
          data-title="1 column row"
          style={{
            paddingTop: "20px",
            paddingBottom: "20px",
            margin: "0px auto",
            width: "80%",
            maxWidth: "100%",
          }}
        >
          <div
            className="col-md-12 innerContent col_left"
            id="col-full-140"
            data-title="1st column"
          >
            <div
              className="col-inner bgCover noBorder borderSolid border3px cornersAll radius0 shadow0 P0-top P0-bottom P0H noTopMargin"
              style={{ padding: "0 10px" }}
            >
              <div
                className="de elHeadlineWrapper"
                id="headline-31858"
                data-title="headline"
                style={{ marginTop: "0px" }}
              >
                <div
                  className="ne elHeadline hsSize3 elMargin0 elBGStyle0 hsTextShadow0 lh2 mfs_13"
                  style={{
                    textAlign: "center",
                    fontSize: "15px",
                    color: "rgb(136, 136, 136)",
                    letterSpacing: "0.5px",
                  }}
                >
                  <div>
                    <span style={{ color: "#f5f5f5" }}>
                      <b>
                        {
                          "Copyright 2026 - High Impact Marketing - All Rights Reserved"
                        }
                      </b>
                    </span>
                  </div>
                </div>
              </div>
              <div
                className="de elHeadlineWrapper"
                id="headline-99455"
                data-title="headline"
                style={{ marginTop: "15px" }}
              >
                <div
                  className="ne elHeadline hsSize3 elMargin0 elBGStyle0 hsTextShadow0 lh2 mfs_11"
                  style={{
                    textAlign: "center",
                    fontSize: "15px",
                    color: "rgb(136, 136, 136)",
                    letterSpacing: "0.5px",
                  }}
                >
                  <div>
                    <a
                      href="https://class.theinvinciblemarketer.com/terms/privacy"
                      id="link-22313"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "rgb(177, 177, 177)" }}
                    >
                      {"Privacy Policy"}
                    </a>
                    {" | "}
                    <a
                      href="https://class.theinvinciblemarketer.com/terms/terms"
                      id="link-84577"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "rgb(177, 177, 177)" }}
                    >
                      {"Terms of Service"}
                    </a>
                    {" | "}
                    <a
                      href="https://class.theinvinciblemarketer.com/terms/refund-policy-im"
                      id="link-62593"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "rgb(177, 177, 177)" }}
                    >
                      {"Refund Policy"}
                    </a>
                  </div>
                </div>
              </div>
              <div
                className="de elHeadlineWrapper"
                id="headline-37675"
                data-title="headline"
                style={{ marginTop: "30px" }}
              >
                <div
                  className="ne elHeadline hsSize3 elMargin0 elBGStyle0 hsTextShadow0 lh2 mfs_10"
                  style={{
                    textAlign: "center",
                    fontSize: "12px",
                    color: "rgb(136, 136, 136)",
                    letterSpacing: "0.5px",
                  }}
                >
                  <div>
                    {
                      "This site and the products and services offered on this site are not associated, affiliated, endorsed, or sponsored by Google, eBay, Amazon, Yahoo or Bing nor have they been reviewed tested or certified by Google, Yahoo, eBay, Amazon, or Bing. The typical purchaser does not make any money using this system. Invincible Marketer does not guarantee income or success, and examples shown in this presentation do not represent an indication of future success or earnings. The company declares the information shared is true and accurate."
                    }
                  </div>
                  <div>
                    <br />
                  </div>
                  <div>
                    {
                      "Testimonials, case studies, and examples found on this page are results that have been forwarded to us by users of Invincible Marketer. Products and related products are not intended to represent or guarantee that anyone will achieve the same or similar results."
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
