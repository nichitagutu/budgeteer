import "./StartPage.css";

export default function StartPage() {
  return (
    <div className="start-page">
      <h1 className="start-page__header">Where did all the money go?</h1>
      <p className="start-page__text">
        Never ask this question once again - because now you have all your
        spends and incomes tracked and analysed!
      </p>
      <p className="start-page__text">💸🏠📤💵</p>
      <p className="start-page__text">
        There are 4 main components in the app
      </p>
      <div className="info-blocks">
        <div className="info-block">
          <h2 className="info-block__header">💵 Income</h2>
          <p className="info-block__text">
            Add all of your income here divided by categories to track the
            statistics. Savings are a different category tho.
          </p>
        </div>
        <div className="info-block">
          <h2 className="info-block__header">💸 Expenses</h2>
          <p className="info-block__text">
            Track each expense to analyse the cash flow and understand your
            spending habits. View a breakdown and a summary.
          </p>
        </div>
        <div className="info-block">
          <h2 className="info-block__header">📤 Savings</h2>
          <p className="info-block__text">
            Your savings are a separate tracker to see the progress and
            understand the total amount of saved money and available to spend
            monthly or daily.
          </p>
        </div>
        <div className="info-block">
          <h2 className="info-block__header">🏠 Bills&Subscriptions</h2>
          <p className="info-block__text">
            Reoccurring payments are different from other spendings - but should
            be included in the breakdown on the expenses. Add your regular
            payments separately and we will track them automatically.
          </p>
        </div>
      </div>
    </div>
  );
}
