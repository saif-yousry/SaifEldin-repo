// src/components/alerts.js
import { useState, useEffect } from 'react'
import './alerts.css'
import { supabase } from '../supabaseClient'

function Alerts() {
  const [alerts, setAlerts] = useState([])

  useEffect(() => {
    fetchAlerts()
  }, [])

  const fetchAlerts = async () => {
    const { data, error } = await supabase.from('alerts').select('*').order('created_at', { ascending: false })
    if (!error) setAlerts(data)
  }

  return (
    <div className="alerts-container">
      <h2>Alerts</h2>
      <ul>
        {alerts.map((alert, idx) => <li key={idx}>{alert.message}</li>)}
      </ul>
    </div>
  )
}

export default Alerts
