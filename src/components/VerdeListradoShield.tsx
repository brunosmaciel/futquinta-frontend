type VerdeListradoShieldProps = {
  className: string;
};

const VerdeListradoShield = ({ className }: VerdeListradoShieldProps) => {
  return (
    <>
      <svg
        className={className}
        viewBox="0 0 312 366"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="30" height="248" transform="translate(20.5 20.5)" fill="#B4FB6F" />
        <rect width="30" height="291" transform="translate(80.5 20.5)" fill="#B4FB6F" />
        <rect width="30" height="328" transform="matrix(-1 0 0 1 170.5 20.5)" fill="#B4FB6F" />
        <rect width="30" height="298" transform="matrix(-1 0 0 1 230.5 18.5)" fill="#B4FB6F" />
        <rect width="30" height="255" transform="matrix(-1 0 0 1 290.5 13.5)" fill="#B4FB6F" />
        <rect width="30" height="265" transform="translate(50.5 20.5)" fill="black" />
        <rect width="30" height="315" transform="translate(110.5 20.5)" fill="black" />
        <rect width="30" height="315" transform="translate(170.5 20.5)" fill="black" />
        <rect width="30" height="277" transform="translate(230.5 20.5)" fill="black" />
        <path
          d="M301.5 251.438L156.909 355.5H154.181L10.5 251.438V10.5H301.5V251.438Z"
          stroke="black"
          stroke-width="21"
        />
      </svg>
    </>
  );
};

export default VerdeListradoShield;
