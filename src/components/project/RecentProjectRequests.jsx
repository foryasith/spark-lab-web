import { Clock3, Trash2 } from 'lucide-react'
import './RecentProjectRequests.css'

const dateFormatter = new Intl.DateTimeFormat('en-LK', {
  dateStyle: 'medium',
  timeStyle: 'short',
})

function formatRequestDate(value) {
  const requestDate = new Date(value)
  return Number.isNaN(requestDate.getTime()) ? 'Recently created' : dateFormatter.format(requestDate)
}

function RecentProjectRequests({ requests, onClear }) {
  if (requests.length === 0) return null

  return (
    <section className="recent-project-requests" aria-labelledby="recent-projects-title">
      <header>
        <div>
          <span><Clock3 aria-hidden="true" size={16} /> Saved on this device</span>
          <h3 id="recent-projects-title">Recent Project Requests</h3>
        </div>
        <button className="btn btn-outline" type="button" onClick={onClear}>
          <Trash2 aria-hidden="true" size={15} />
          Clear Recent Projects
        </button>
      </header>
      <div className="recent-project-list">
        {requests.map((request) => (
          <article key={request.id}>
            <div>
              <h4>{request.projectName}</h4>
              <time dateTime={request.createdAt}>{formatRequestDate(request.createdAt)}</time>
            </div>
            {request.summary && <p>{request.summary}</p>}
          </article>
        ))}
      </div>
      <small>Only a short project summary is stored locally. No account is required.</small>
    </section>
  )
}

export default RecentProjectRequests
