import React from 'react'

const STATUS_LABELS = {
  safe: 'Safe',
  closing: 'Closing',
  closed: 'Closed',
}

/**
 * Saved walks list with empty state.
 * Each walk row is a button for keyboard accessibility (AC-9).
 * All three statuses pair icon + word + colour (R3 — never colour alone).
 */
export function SavedWalks({ walks, onAddWalk, onWalkClick }) {
  return (
    <div>
      <div className="section-head">
        <div className="label">Saved walks</div>
        {walks.length > 0 && (
          <div className="label" style={{ color: 'var(--ink-soft)' }}>{walks.length}</div>
        )}
      </div>

      {walks.length > 0 && (
        <div className="walks" style={{ marginTop: 'calc(10px * var(--density, 1))' }}>
          {walks.map((walk) => (
            <WalkRow key={walk.id} walk={walk} onClick={() => onWalkClick?.(walk)} />
          ))}
        </div>
      )}

      <button
        className="add-walk"
        onClick={onAddWalk}
        aria-label="Add a walk"
        style={{ marginTop: walks.length > 0 ? undefined : 'calc(10px * var(--density, 1))' }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
          <path d="M12 5v14M5 12h14"/>
        </svg>
        Add a walk
      </button>
    </div>
  )
}

function WalkRow({ walk, onClick }) {
  const label = STATUS_LABELS[walk.status] ?? walk.status
  return (
    <button
      className="walk"
      onClick={onClick}
      aria-label={`${walk.name}, status: ${label}`}
    >
      <span className="name">{walk.name}</span>
      <span className="when">{walk.when}</span>
      <span className={`status ${walk.status}`}>
        <span className="sdot" aria-hidden="true" />
        {label}
      </span>
    </button>
  )
}
