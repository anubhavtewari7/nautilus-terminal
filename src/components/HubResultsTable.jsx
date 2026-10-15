'use client'

/**
 * HubResultsTable — Blueprint.js-styled data table for sourcing hub results.
 *
 * Uses @blueprintjs/table for the column/row grid, dark-themed to match
 * NAUTILUS Terminal's intelligence aesthetic. CSS is imported here (scoped
 * to the .bp5-dark container) so it doesn't bleed into Tailwind styles.
 *
 * Props:
 *   hubs       — array of hub objects from the scan result
 *   onHubClick — callback(hub) when a row is selected
 */

import React, { useEffect, useRef, useState } from 'react'

// ─── Blueprint core imports ───────────────────────────────────────────────
// We import CSS server-side via the component so Next.js bundles it only
// when this component is used (not globally).
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import '@blueprintjs/table/lib/css/table.css'

import { Column, ColumnHeaderCell, Cell, Table2 } from '@blueprintjs/table'
import { Tag, Intent } from '@blueprintjs/core'

// ─── Score → Blueprint Intent mapping ────────────────────────────────────
function scoreToIntent(score) {
  if (score >= 80) return Intent.SUCCESS
  if (score >= 60) return Intent.WARNING
  if (score >= 40) return Intent.DANGER
  return Intent.NONE
}

function scoreToLabel(score) {
  if (score >= 80) return 'HIGH'
  if (score >= 60) return 'MED'
  if (score >= 40) return 'LOW'
  return 'N/A'
}

// ─── Column definitions ───────────────────────────────────────────────────
const COLUMNS = [
  { key: 'rank',        label: '#',          width: 36  },
  { key: 'hub',         label: 'HUB',        width: 150 },
  { key: 'country',     label: 'COUNTRY',    width: 110 },
  { key: 'score',       label: 'SCORE',      width: 72  },
  { key: 'leadTime',    label: 'LEAD TIME',  width: 90  },
  { key: 'riskLevel',   label: 'RISK',       width: 70  },
  { key: 'category',    label: 'CATEGORY',   width: 110 },
  { key: 'tier',        label: 'TIER',       width: 60  },
]

export default function HubResultsTable({ hubs = [], onHubClick }) {
  const [selectedRow, setSelectedRow] = useState(null)

  if (!hubs || hubs.length === 0) return null

  // Normalise hub data — handle varying shapes from the scan engine
  const rows = hubs.map((h, i) => ({
    rank:      i + 1,
    hub:       h.hub || h.name || '—',
    country:   h.country || h.hub?.split(',').pop()?.trim() || '—',
    score:     typeof h.score === 'number' ? Math.round(h.score) : null,
    leadTime:  h.leadTime || h.lead_time || '—',
    riskLevel: h.riskLevel || h.risk || '—',
    category:  h.category || h.product_category || '—',
    tier:      h.tier != null ? `T${h.tier}` : '—',
    _raw:      h,
  }))

  // ─── Cell renderers ───────────────────────────────────────────────────
  const renderCell = (colKey) => (rowIndex) => {
    const row = rows[rowIndex]
    if (!row) return <Cell />
    const isSelected = selectedRow === rowIndex

    switch (colKey) {
      case 'rank':
        return (
          <Cell style={{ textAlign: 'center', color: '#8F99A8', fontSize: 11 }}>
            {row.rank}
          </Cell>
        )
      case 'hub':
        return (
          <Cell
            style={{
              fontWeight: 600,
              fontSize: 11,
              color: isSelected ? '#2D72D2' : '#F5F8FA',
              cursor: 'pointer',
            }}
            onClick={() => {
              setSelectedRow(rowIndex)
              onHubClick?.(row._raw)
            }}
          >
            {row.hub}
          </Cell>
        )
      case 'country':
        return (
          <Cell style={{ fontSize: 11, color: '#ABB3BF' }}>{row.country}</Cell>
        )
      case 'score':
        return (
          <Cell>
            {row.score != null ? (
              <Tag
                intent={scoreToIntent(row.score)}
                minimal
                style={{ fontSize: 10, fontWeight: 700, fontFamily: 'monospace' }}
              >
                {row.score}
              </Tag>
            ) : (
              <span style={{ color: '#5C7080', fontSize: 11 }}>—</span>
            )}
          </Cell>
        )
      case 'leadTime':
        return (
          <Cell style={{ fontSize: 11, color: '#CED9E0' }}>{row.leadTime}</Cell>
        )
      case 'riskLevel': {
        const riskColor = row.riskLevel === 'HIGH' || row.riskLevel === 'CRITICAL'
          ? '#FF7373'
          : row.riskLevel === 'MEDIUM'
            ? '#FFC940'
            : '#72CA9B'
        return (
          <Cell>
            <span style={{ fontSize: 10, fontWeight: 700, color: riskColor, fontFamily: 'monospace' }}>
              {row.riskLevel}
            </span>
          </Cell>
        )
      }
      case 'category':
        return (
          <Cell style={{ fontSize: 10, color: '#8F99A8', fontFamily: 'monospace' }}>
            {row.category}
          </Cell>
        )
      case 'tier':
        return (
          <Cell style={{ fontSize: 11, color: '#D9822B', fontWeight: 600, textAlign: 'center' }}>
            {row.tier}
          </Cell>
        )
      default:
        return <Cell />
    }
  }

  return (
    <div
      className="bp5-dark"
      style={{
        borderRadius: 12,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.08)',
        background: '#0A0A0A',
      }}
    >
      {/* Panel header */}
      <div style={{
        padding: '8px 12px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#22D3EE',
          fontFamily: 'ui-monospace, monospace',
        }}>
          Sourcing Hub Results — {rows.length} matches
        </span>
        <span style={{ fontSize: 9, color: '#5C7080' }}>
          Click a row to select hub
        </span>
      </div>

      {/* Blueprint Table */}
      <Table2
        numRows={rows.length}
        columnWidths={COLUMNS.map(c => c.width)}
        rowHeights={rows.map(() => 32)}
        enableRowHeader={false}
        enableColumnResizing
        enableRowResizing={false}
        enableGhostCells={false}
        selectionModes={[]}
        defaultRowHeight={32}
        enableFocusedCell={false}
        getCellClipboardData={(row, col) => rows[row]?.[COLUMNS[col]?.key] ?? ''}
        onSelection={(selections) => {
          if (selections.length > 0) {
            const rowIndex = selections[0].rows?.start
            if (typeof rowIndex === 'number') {
              setSelectedRow(rowIndex)
              onHubClick?.(rows[rowIndex]._raw)
            }
          }
        }}
      >
        {COLUMNS.map(col => (
          <Column
            key={col.key}
            name={col.label}
            cellRenderer={renderCell(col.key)}
            columnHeaderCellRenderer={() => (
              <ColumnHeaderCell
                name={col.label}
                nameRenderer={() => (
                  <span style={{
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    color: '#8F99A8',
                    fontFamily: 'ui-monospace, monospace',
                  }}>
                    {col.label}
                  </span>
                )}
              />
            )}
          />
        ))}
      </Table2>
    </div>
  )
}
