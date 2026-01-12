type RankPositionTdProps = {
  index: number;
  awardPosition: number;
};

const RankPositionTd = ({ index, awardPosition }: RankPositionTdProps) => {
  return (
    <th
      data-willbeawarded={index < awardPosition}
      className="w-16 data-[willbeawarded=true]:text-xl    data-[willbeawarded=true]:text-green-600"
    >
      <span
        data-willbeawarded={index < awardPosition}
        className="data-[willbeawarded=true]:text-xl  data-[willbeawarded=true]:underline   data-[willbeawarded=true]:text-green-600"
      >
        {index + 1}
      </span>{' '}
      <span>°</span>
    </th>
  );
};

export { RankPositionTd };
