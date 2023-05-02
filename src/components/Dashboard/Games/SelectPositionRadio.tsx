export const SelectPositionRadio = ()=>{
  return <div className="flex items-center flex-1">
  <input
    type="radio"
    value="GOALKEEPER"
    className="radio"
    {...register('playerFunction')}
  />
  <label htmlFor="">Goleiro</label>
</div>
<div className="flex items-center flex-1">
  <input
    type="radio"
    value="OUTFIELDPLAYER"
    className="radio"
    {...register('playerFunction')}
  />
  <label htmlFor="">Linha</label>
</div>
}