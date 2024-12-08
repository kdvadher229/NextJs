
export default  function UserReviewPage() {

  /** As this route matches all the /reviews we can have params as {params: {params:{allReviews[]}}} 
   * for the catch all segment we can do like [[...allreviews]]
  */
  return (
    <>
    <h1>Users Review</h1>
    <h2>This url matches all the routes followed by /reviews</h2>
    </>
  )
}
