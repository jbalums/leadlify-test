import VideoEmbed from "../VideoEmbed";

export default function Announcement() {
  return (
    <header
      className="container fullContainer noTopMargin padding20-top padding20-bottom padding40H borderSolid cornersAll radius0 shadow0 bgNoRepeat emptySection border5px noBorder"
      id="container-26455"
      data-title="Section"
      style={{
        paddingTop: "0px",
        paddingBottom: "0px",
        background:
          "linear-gradient(225deg, rgb(219, 180, 73), rgb(240, 213, 104), rgb(203, 169, 69))",
        borderColor: "rgb(171, 142, 39)",
      }}
      aria-label="Program overview"
    >
      <div className="containerInner">
        <div
          className="row bgCover noBorder borderSolid border3px cornersAll radius0 shadow0 P0-top P0-bottom P0H noTopMargin"
          id="row--33836"
          data-title="1 column row"
          style={{ padding: "13px 0px", margin: "0px" }}
        >
          <div
            className="col-md-12 innerContent col_left"
            id="col-full-133"
            data-title="1st column"
          >
            <div
              className="col-inner bgCover noBorder borderSolid border3px cornersAll radius0 shadow0 P0-top P0-bottom P0H noTopMargin"
              style={{ padding: "0 10px" }}
            >
              <div
                className="de elHeadlineWrapper"
                id="headline-12137"
                data-title="headline"
                style={{ marginTop: "0px" }}
              >
                <div
                  className="ne elHeadline hsSize3 lh4 elMargin0 elBGStyle0 hsTextShadow0 deUppercase de1pxLetterSpacing mfs_12"
                  style={{ textAlign: "center", fontSize: "18px" }}
                >
                  <span style={{ color: "#141414" }}>
                    {
                      "Built for complete Beginners • Designed for Long-Term Success • Just $67/Month"
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
