export const Icon = ({ isDark }) => {
  return (
    <svg
      id="b9638309-7b37-4931-8a64-0c05f8893d6e"
      data-name="Capa 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 25.21 27.2"
      style={
        isDark
          ? { fill: "white", stroke: "white" }
          : { fill: "none", stroke: "black" }
      }
      height="15px"
      width="15px"
    >
      <defs>
        <style>
          .b174f250-232d-4871-8d6f-3ac7bb39e549 stroke-miterlimit: 10;
          stroke-width: 0.75px;
        </style>
      </defs>
      <path
        className="b174f250-232d-4871-8d6f-3ac7bb39e549"
        d="M26.92,22.94a13.33,13.33,0,1,1-14.14-21A13.33,13.33,0,0,0,23.29,23.45,13.15,13.15,0,0,0,26.92,22.94Z"
        transform="translate(-2.71 -1.25)"
      />
    </svg>
  );
};

export const Arrow = ({ isDark }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 640"
      style={isDark ? { fill: "white" } : { fill: "black" }}
    >
      <path
        fill=""
        d="M41.4 297.4C28.9 309.9 28.9 330.2 41.4 342.7L169.4 470.7C181.9 483.2 202.2 483.2 214.7 470.7C227.2 458.2 227.2 437.9 214.7 425.4L141.3 352L576 352C593.7 352 608 337.7 608 320C608 302.3 593.7 288 576 288L141.3 288L214.7 214.6C227.2 202.1 227.2 181.8 214.7 169.3C202.2 156.8 181.9 156.8 169.4 169.3L41.4 297.3z"
      />
    </svg>
  );
};
