export function Settings() {
  return (
    <div>
      <p>Выберите набор данных:</p>
      <form>
        <input type="radio" id="small" name="size" checked={true}></input>
        <label htmlFor="small">Маленький</label>
        <input type="radio" id="large" name="size"></input>
        <label htmlFor="large">Большой</label>
        <button action="#" type="submit"></button>
      </form>
    </div>
  );
}