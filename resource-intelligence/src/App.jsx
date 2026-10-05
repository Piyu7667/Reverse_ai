import {useState,useMemo,useEffect} from 'react'
import {DOMAINS,PROBLEM,SOLUTION} from './data'
const P={High:3,Medium:2,Low:1}
const avail=r=>Math.round(r.total*(1-r.util/100))

function runMatch(resources,demands,mult=1){
  const left=Object.fromEntries(resources.map(r=>[r.id,avail(r)]))
  return [...demands].sort((a,b)=>P[b.priority]-P[a.priority]).map(d=>{
    const need=Math.ceil(d.req*mult)
    const c=resources.filter(r=>r.type===d.type&&r.avail==='Available'&&left[r.id]>=need)
      .map(r=>({r,score:Math.round(100-((left[r.id]-need)/r.total)*30+(r.loc===d.loc?15:0)-(r.util>80?10:0))}))
      .sort((a,b)=>b.score-a.score)[0]
    if(!c) return {d,need,none:true}
    left[c.r.id]-=need
    return {d,need,r:c.r,score:Math.min(c.score,99),cross:c.r.dept!==d.dept}
  })
}

function Prototype(){
  const [dom,setDom]=useState(()=>localStorage.getItem('rs-domain')||'Manufacturing')
  const [mult,setMult]=useState(100)
  useEffect(()=>localStorage.setItem('rs-domain',dom),[dom])
  const {resources,demands,unit}=DOMAINS[dom]
  const base=useMemo(()=>runMatch(resources,demands),[dom])
  const sim=useMemo(()=>runMatch(resources,demands,mult/100),[dom,mult])
  const hidden=resources.filter(r=>r.util<50&&r.avail==='Available')
  const avg=Math.round(resources.reduce((s,r)=>s+r.util,0)/resources.length)
  const reuse=base.filter(m=>!m.none).length
  return <main>
    <header className="hero">
      <h1>Turn resources into intelligence.</h1>
      <p>RE:SOURCE finds the capacity you already own and matches it to demand before anyone buys more.</p>
      <div className="tabs">{Object.keys(DOMAINS).map(d=><button key={d} className={d===dom?'on':''} onClick={()=>setDom(d)}>{d}</button>)}</div>
    </header>
    <section className="stats">
      <div><b>{avg}%</b><span>average utilisation</span></div>
      <div><b>{hidden.length}</b><span>resources with hidden capacity</span></div>
      <div><b>{reuse}/{demands.length}</b><span>demands met by reuse</span></div>
      <div><b>{demands.length-reuse}</b><span>need acquisition</span></div>
    </section>
    <section><h2>Resources</h2>
      <div className="scroll"><table><thead><tr><th>ID</th><th>Type</th><th>Total ({unit})</th><th>Utilisation</th><th>Available</th><th>Location</th><th>Status</th><th>Department</th><th>Attributes</th></tr></thead>
      <tbody>{resources.map(r=><tr key={r.id}><td>{r.id}</td><td>{r.type}</td><td>{r.total}</td>
        <td><div className="bar"><i style={{width:r.util+'%'}} className={r.util>80?'hot':r.util<50?'cool':''}/></div>{r.util}%</td>
        <td>{avail(r)}</td><td>{r.loc}</td><td>{r.avail}</td><td>{r.dept}</td><td>{r.attrs}</td></tr>)}</tbody></table></div></section>
    <section><h2>Demands and recommended matches</h2>
      <div className="grid">{base.map(m=><article key={m.d.id} className={'card '+(m.none?'warn':'ok')}>
        <h3>{m.d.id} · {m.d.type} <em>{m.d.priority}</em></h3>
        <p>{m.d.dept} needs {m.d.req} {unit} · {m.d.time} · {m.d.loc} · {m.d.constraint}</p>
        {m.none?<p><strong>No spare capacity.</strong> Acquire or reschedule.</p>
        :<p><strong>Reuse {m.r.id}</strong> from {m.r.dept} ({m.r.loc}). Match score {m.score}.{m.cross&&' Cross-department reuse.'}</p>}
      </article>)}</div></section>
    <section><h2>What-if: demand changes</h2>
      <label className="slider">Demand at <b>{mult}%</b> <input type="range" min="100" max="200" step="10" value={mult} onChange={e=>setMult(+e.target.value)}/></label>
      <p className="lead">At {mult}% demand, reuse covers <b>{sim.filter(m=>!m.none).length}</b> of {sim.length} requests. <b>{sim.filter(m=>m.none).length}</b> would need new resources{sim.filter(m=>m.none).length>base.filter(m=>m.none).length?`, ${sim.filter(m=>m.none).length-base.filter(m=>m.none).length} more than today.`:'.'}</p></section>
    <section><h2>Hidden capacity</h2>
      <div className="grid">{hidden.length?hidden.map(r=><article key={r.id} className="card cool"><h3>{r.id} · {r.type}</h3><p>{avail(r)} {unit} idle in {r.dept} ({r.loc}), only {r.util}% used.</p></article>):<p>No under-used resources in this domain.</p>}</div></section>
  </main>
}

function Rail({items}){
  return <nav className="rail">{items.map(([id,l])=><a key={id} href={'#'+id}>{l}</a>)}</nav>
}

function Problem(){
  const p=PROBLEM
  return <main className="long"><Rail items={[['root','Root causes'],['users','User requirements'],['io','Inputs and outputs'],['con','Constraints'],['gap','Gaps']]}/>
  <div className="body">
    <header className="hero"><h1>Problem → Deconstruction</h1><p>Organisations own capacity they cannot see, so they buy more. This page breaks that problem into parts.</p></header>
    <section id="root"><h2>Root causes</h2><div className="grid">{p.causes.map(([t,d])=><article className="card" key={t}><h3>{t}</h3><p>{d}</p></article>)}</div></section>
    <section id="users"><h2>User requirements</h2><div className="grid">{p.users.map(([t,d])=><article className="card" key={t}><h3>{t}</h3><p>{d}</p></article>)}</div></section>
    <section id="io"><h2>Inputs and outputs</h2><div className="two">
      <div><h3>Inputs</h3><ul>{p.inputs.map(x=><li key={x}>{x}</li>)}</ul></div>
      <div><h3>Outputs</h3><ul>{p.outputs.map(x=><li key={x}>{x}</li>)}</ul></div></div></section>
    <section id="con"><h2>Constraints</h2><ul>{p.constraints.map(x=><li key={x}>{x}</li>)}</ul></section>
    <section id="gap"><h2>Gaps</h2><div className="scroll"><table><thead><tr><th></th><th>Gap</th><th>What closes it</th></tr></thead>
      <tbody>{p.gaps.map(g=><tr key={g[1]}>{g.map(c=><td key={c}>{c}</td>)}</tr>)}</tbody></table></div></section>
  </div></main>
}

function Solution(){
  const s=SOLUTION
  return <main className="long"><Rail items={[['ai','Where AI fits'],['sol','Solution'],['impl','Implementation'],['stack','Technology']]}/>
  <div className="body">
    <header className="hero"><h1>AI Opportunity → Solution → Implementation</h1><p>AI is used where people lose time today: reading scattered data, predicting demand, and choosing a match.</p></header>
    <section id="ai"><h2>Where AI fits</h2><div className="grid">{s.ai.map(([t,d])=><article className="card" key={t}><h3>{t}</h3><p>{d}</p></article>)}</div></section>
    <section id="sol"><h2>Solution flow</h2><ol className="flow">{s.pipeline.map(x=><li key={x}>{x}</li>)}</ol>
      <p className="lead">Core idea: reuse resources before acquiring new ones.</p></section>
    <section id="impl"><h2>Implementation</h2><div className="grid">{s.phases.map(([t,d,st])=><article className={'card '+(st==='Done'?'ok':'')} key={t}><h3>{t} <em>{st}</em></h3><p>{d}</p></article>)}</div></section>
    <section id="stack"><h2>Technology</h2><div className="scroll"><table><tbody>{s.stack.map(([a,b])=><tr key={a}><td><b>{a}</b></td><td>{b}</td></tr>)}</tbody></table></div></section>
  </div></main>
}

export default function App(){
  const [page,setPage]=useState('proto')
  useEffect(()=>window.scrollTo(0,0),[page])
  const nav=[['proto','Prototype'],['problem','Problem and deconstruction'],['solution','AI solution and build']]
  return <>
    <div className="top"><strong>RE:SOURCE</strong><nav>{nav.map(([k,l])=><button key={k} className={k===page?'on':''} onClick={()=>setPage(k)}>{l}</button>)}</nav></div>
    {page==='proto'?<Prototype/>:page==='problem'?<Problem/>:<Solution/>}
    <footer>Team Logic Grid · Smart India Hackathon 2026</footer>
  </>
}
