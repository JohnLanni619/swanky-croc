import { gql, useQuery } from "@apollo/client";

const GET_GAMES = gql`
  query Query($screenshotListId: ID!) {
  screenshotList(id: $screenshotListId) {
    count
    next
    previous
    list {
      screenshot_id
      width
      image
      height
      is_deleted
    }
  }
}
`;

export default function Screenshot({id, parentCallback}) {
    let { loading, error, data } = useQuery(GET_GAMES, {
        variables: {
            screenshotListId: id
        },
        notifyOnNetworkStatusChange: true,
      });

    if (loading) return;
    if (error) return (
        <p>{error.message}</p>
    )

    function onTrigger(event) {
        return parentCallback(event.target.currentSrc)
    }

    return (
        <div className="grid-auto-flow snaps-inline">
            {data.screenshotList.list.map( (screenshot) => {
                return (
                    <img key={screenshot.screenshot_id} className="grid-item screenshot" onMouseEnter={onTrigger} id="screenshot" src={screenshot.image} alt="screenshot" width="100px" />
                )
            })}
        </div>
    )
}