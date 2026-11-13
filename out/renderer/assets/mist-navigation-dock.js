const ICONS = {
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  home: '<rect x="3" y="10" width="18" height="11" rx="2"/><path d="m2 10 10-7 10 7M9 21v-7h6v7"/>',
  install: '<path d="M4 5.5 12 2l8 3.5v13L12 22l-8-3.5z"/><path d="m4 5.5 8 4 8-4M12 9.5V22M8 7.5v3l3 1.5"/>',
  world: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  pack: '<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9z"/><path d="m4 7.5 8 4.5 8-4.5M12 12v9M8 5l8 4.5"/>',
  skin: '<path d="M8 4 5 6l-3 4 3 3 2-2v10h10V11l2 2 3-3-3-4-3-2-4 3z"/><path d="M8 4c0 2 2 3 4 3s4-1 4-3"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.6a8 8 0 0 1-1.5.9l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.5-.9l-1.7.6-1.4-2.4 1.4-1.1a8 8 0 0 1 0-1.8l-1.4-1.1 1.4-2.4 1.7.6a8 8 0 0 1 1.5-.9l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.5.9l1.7-.6 1.4 2.4-1.4 1.1a8 8 0 0 1 0 1.7Z" transform="translate(-1 -1) scale(1.08)"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  play: '<path d="m8 5 12 7-12 7z" fill="currentColor" stroke="none"/>',
  manage: '<path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.6a8 8 0 0 1-1.5.9l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.5-.9l-1.7.6-1.4-2.4 1.4-1.1a8 8 0 0 1 0-1.8l-1.4-1.1 1.4-2.4 1.7.6a8 8 0 0 1 1.5-.9l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.5.9l1.7-.6 1.4 2.4-1.4 1.1a8 8 0 0 1 0 1.7Z" transform="translate(-1 -1) scale(1.08)"/>',
  changes: '<path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5"/>',
  discord: '<path d="M7 7c3-2 7-2 10 0l2 10c-2 2-4 3-7 3s-5-1-7-3l2-10Z"/><path d="M9 13h.01M15 13h.01M8 8 6 6m10 2 2-2"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
  youtube: '<rect x="3" y="5" width="18" height="14" rx="4"/><path d="m10 9 5 3-5 3z"/>'
  ,search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  routeVersions: '<path d="M5 4h10l4 4v12H5z"/><path d="M15 4v4h4M8 12h8M8 16h5"/>',
  routeModpacks: '<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9z"/><path d="m4 7.5 8 4.5 8-4.5M12 12v9"/><path d="m8 5.3 8 4.4"/>',
  routeMods: '<path d="M9 4a3 3 0 1 0-3 3H4v5h5v-2a3 3 0 1 1 6 0v2h5V7h-2a3 3 0 1 0-3-3"/><path d="M4 15h5v2a3 3 0 1 0 6 0v-2h5v5H4z"/>',
  routeResources: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21z"/><path d="M4 5.5v13M8 7h8M8 11h8M8 15h5"/>',
  routeShaders: '<circle cx="12" cy="12" r="4"/><path d="M12 2v3m0 14v3M4.93 4.93l2.12 2.12m9.9 9.9 2.12 2.12M2 12h3m14 0h3M4.93 19.07l2.12-2.12m9.9-9.9 2.12-2.12"/><path d="m10 12 1.3 1.3L14.5 10"/>',
  routeWorlds: '<path d="m3 7 6-3 6 3 6-3v13l-6 3-6-3-6 3z"/><path d="M9 4v13m6-10v13"/><path d="m4 14 3-3 3 2 3-4 3 3 4-2"/>',
  routeChat: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-5 4v-4.3a2.5 2.5 0 0 1-1-2.2z"/><path d="M8 8h8M8 12h5"/>',
  routeSkins: '<circle cx="12" cy="6" r="3"/><path d="m8 10-3 2v8h14v-8l-3-2-4 3z"/><path d="m8 10 4 3 4-3M12 13v7"/>',
  routeCapes: '<path d="m8 4 4 2 4-2 4 3-2 14H6L4 7z"/><path d="M8 4v5l4 3 4-3V4M12 12v9"/><path d="m9 16 3 2 3-2"/>'
};
const svg = (name) => `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.home}</svg>`;
const findButton = (selectors) => selectors.map((selector) => document.querySelector(selector)).find(Boolean);
const clickExisting = (selectors) => { const target = findButton(selectors); if (target) target.click(); return Boolean(target); };
const formatBytes = (value) => { const n = Number(value); if (!Number.isFinite(n) || n <= 0) return '0 KB'; const units = ['B','KB','MB','GB']; const i = Math.min(Math.floor(Math.log(n) / Math.log(1024)), units.length - 1); return `${(n / 1024 ** i).toFixed(i ? 1 : 0)} ${units[i]}`; };
const MOD_SHOWCASES = [
  { id:'pJ-6UO7uSPY', title:'I Secretly Combined POKEMON in Minecraft..', creator:'ShadowApples', tags:['Cobblemon','creatures','adventure'], summary:'A Minecraft adventure built around the Cobblemon mod.', contents:['Cobblemon'], version:'Minecraft mod showcase' },
  { id:'pVZJVPg_eZc', title:'Sodiumだけで十分？軽量化MOD17種を検証', creator:'Mine-Tech', tags:['Sodium','performance','optimization'], summary:'A performance-focused comparison featuring Sodium and additional optimization mods.', contents:['Sodium','Minecraft optimization mods'], version:'Fabric / NeoForge coverage' },
  { id:'i1hwqk5ZorQ', title:'Mod Tanıtımı | Bölüm 1 | CREATE!', creator:'Create Showcase', tags:['Create','automation','machines'], summary:'A short introduction to the Create mod and its mechanical building systems.', contents:['Create'], version:'Create mod showcase' }
];
function syncPopularCategories() {
  document.querySelectorAll('.catalog-filters').forEach(filters=>{
    const selects=[...filters.querySelectorAll('select')],category=selects.find(select=>select.getAttribute('aria-label')==='Category'),sort=selects.find(select=>select.getAttribute('aria-label')==='Sort results');
    if(!category||!sort)return;
    let row=filters.querySelector('.mist-popular-categories');if(!row){row=document.createElement('div');row.className='mist-popular-categories';sort.after(row)}
    const preferred=['adventure','optimization','technology','magic','decoration','utility','cursed','combat','food','exploration'];
    const options=[...category.options].filter(option=>option.value);
    const chosen=preferred.map(key=>options.find(option=>option.value.toLowerCase()===key||option.textContent.toLowerCase()===key)).filter(Boolean);
    const remaining=options.filter(option=>!chosen.includes(option));
    if(!chosen.length){row.hidden=true;return}row.hidden=false;
    const signature=[...chosen,...remaining].map(option=>option.value).join('|');if(row.dataset.signature===signature)return;row.dataset.signature=signature;
    const makeRow=(label,items,className)=>{const group=document.createElement('div');group.className=`mist-category-group ${className}`;const heading=document.createElement('span');heading.textContent=label;group.appendChild(heading);items.forEach(option=>{const button=document.createElement('button');button.type='button';button.textContent=option.textContent;button.classList.toggle('is-active',category.value===option.value);button.addEventListener('click',()=>{category.value=option.value;category.dispatchEvent(new Event('change',{bubbles:true}))});group.appendChild(button)});return group;};
    row.replaceChildren(makeRow('Popular',chosen,'is-popular'),...(remaining.length?[makeRow('More',remaining,'is-more')]:[]));
  });
}

function syncProjectArt() {
  document.querySelectorAll('.project-card-top, .home-featured-pack').forEach((host) => {
    const image = host.querySelector('.project-icon img');
    if (image?.src) host.style.setProperty('--project-art', `url("${image.src}")`);
  });
}

function renderMarkdown(markdown, sharedReferences) {
  const esc=(value)=>String(value).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const inline=(value)=>esc(value)
    .replace(/!\[([^\]]*)\]\((https?:\/\/[^\s)]+)(?:\s+[^)]*)?\)/gi,'<img src="$2" alt="$1">')
    .replace(/!\[([^\]]*)\]\[([^\]]*)\]/gi,(_,alt,ref)=>referenceLinks.has((ref||alt).trim().toLowerCase())?'<img src="'+referenceLinks.get((ref||alt).trim().toLowerCase())+'" alt="'+alt+'">':_ )
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)(?:\s+[^)]*)?\)/gi,'<a href="$2">$1</a>')
    .replace(/\[([^\]]+)\]\[([^\]]*)\]/gi,(_,label,ref)=>referenceLinks.has((ref||label).trim().toLowerCase())?'<a href="'+referenceLinks.get((ref||label).trim().toLowerCase())+'">'+label+'</a>':_)
    .replace(/`([^`]+)`/g,'<code>$1</code>').replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
    .replace(/__(.+?)__/g,'<strong>$1</strong>').replace(/(?<!\*)\*([^*]+)\*(?!\*)/g,'<em>$1</em>')
    .replace(/(?<!_)_([^_]+)_(?!_)/g,'<em>$1</em>');
  const referenceLinks=sharedReferences||new Map();
  markdown=String(markdown).replace(/^\s*\[([^\]]+)\]:\s*<?(https?:\/\/[^\s>]+)>?(?:\s+.*)?$/gim,(_,label,url)=>{referenceLinks.set(label.trim().toLowerCase(),url);return '';});
  const detailBlocks=[];
  markdown=String(markdown).replace(/<details\b[^>]*>\s*<summary\b[^>]*>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/gi,(_,summary,body)=>{const index=detailBlocks.length;detailBlocks.push('<details><summary>'+inline(summary.trim())+'</summary>'+renderMarkdown(body.trim())+'</details>');return '\nMISTDETAILBLOCK'+index+'TOKEN\n';});
  const lines=String(markdown).replace(/\r/g,'').split('\n'); const out=[]; let i=0;
  const cells=(line)=>line.trim().replace(/^\|/,'').replace(/\|$/,'').split('|').map((cell)=>cell.trim());
  const isTableRule=(line)=>/^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line);
  const isBlock=(line,next='')=>/^\s*(#{1,6}\s|>|```|[-*_]{3,}\s*$|[-*+]\s+|\d+\.\s+)/.test(line)||line.includes('|')&&isTableRule(next);
  while(i<lines.length){
    const line=lines[i]; if(!line.trim()){i++;continue;}
    const detailToken=line.trim().match(/^MISTDETAILBLOCK(\d+)TOKEN$/);if(detailToken){out.push(detailBlocks[Number(detailToken[1])]||'');i++;continue;}
    if(/^\s*```/.test(line)){const code=[];i++;while(i<lines.length&&!/^\s*```/.test(lines[i]))code.push(lines[i++]);i++;out.push(`<pre><code>${esc(code.join('\n'))}</code></pre>`);continue;}
    const heading=line.match(/^\s*(#{1,6})\s+(.+)$/);if(heading){const level=heading[1].length;out.push(`<h${Math.min(level,4)}>${inline(heading[2])}</h${Math.min(level,4)}>`);i++;continue;}
    if(/^\s*(\*\s*){3,}$|^\s*-{3,}\s*$/.test(line)){out.push('<hr>');i++;continue;}
    if(line.includes('|')&&isTableRule(lines[i+1]||'')){const head=cells(line);i+=2;const rows=[];while(i<lines.length&&lines[i].trim()&&lines[i].includes('|'))rows.push(cells(lines[i++]));out.push(`<table><thead><tr>${head.map((cell)=>`<th>${inline(cell)}</th>`).join('')}</tr></thead><tbody>${rows.map((row)=>`<tr>${head.map((_,index)=>`<td>${inline(row[index]||'')}</td>`).join('')}</tr>`).join('')}</tbody></table>`);continue;}
    if(/^\s*>/.test(line)){const quote=[];while(i<lines.length&&/^\s*>/.test(lines[i]))quote.push(inline(lines[i++].replace(/^\s*>\s?/,'')));out.push(`<blockquote>${quote.map((text)=>`<p>${text}</p>`).join('')}</blockquote>`);continue;}
    if(/^\s*[-*+]\s+/.test(line)||/^\s*\d+\.\s+/.test(line)){const ordered=/^\s*\d+\./.test(line),tag=ordered?'ol':'ul',items=[];while(i<lines.length&&(/^\s*[-*+]\s+/.test(lines[i])||/^\s*\d+\.\s+/.test(lines[i])))items.push(`<li>${inline(lines[i++].replace(/^\s*(?:[-*+]|\d+\.)\s+/,''))}</li>`);out.push(`<${tag}>${items.join('')}</${tag}>`);continue;}
    const para=[line];i++;while(i<lines.length&&lines[i].trim()&&!isBlock(lines[i],lines[i+1]||''))para.push(lines[i++]);out.push(`<p>${para.map(inline).join('<br>')}</p>`);
  }
  return out.join('');
}

function paintProjectVersions(detail,data) {
  const browser=detail.querySelector('.mist-version-browser'); if(!browser)return;
  const versions=data.filter(item=>item&&(item.id||item.versionNumber||item.name));
  const filters=[...browser.querySelectorAll('.mist-version-filters select')], rows=browser.querySelector('.mist-version-rows'); if(filters.length!==3||!rows)return;
  const selected=filters.map(filter=>filter.value), unique=values=>[...new Set(values.filter(Boolean).map(String))];
  const loaders=unique(versions.flatMap(item=>item.loaders||item.game_loaders||[]).map(value=>String(value).toLowerCase()));
  const channels=unique(versions.map(item=>String(item.releaseType||item.versionType||item.version_type||'').toLowerCase()));
  const games=unique(versions.flatMap(item=>item.gameVersions||item.game_versions||[]));
  const loaderLabels={fabric:'Fabric',forge:'Forge',neoforge:'NeoForge',quilt:'Quilt'};
  filters[0].replaceChildren(new Option('Any loader',''),...loaders.map(value=>new Option(loaderLabels[value]||value,value)));
  filters[1].replaceChildren(new Option('Any version',''),...games.map(value=>new Option(value,value)));
  filters[2].replaceChildren(new Option('Any channel',''),...channels.map(value=>new Option(value[0].toUpperCase()+value.slice(1),value)));
  filters.forEach((filter,index)=>{if([...filter.options].some(option=>option.value===selected[index]))filter.value=selected[index]});
  const matches=versions.filter(item=>{const itemLoaders=(item.loaders||item.game_loaders||[]).map(value=>String(value).toLowerCase()),itemGames=item.gameVersions||item.game_versions||[],channel=String(item.releaseType||item.versionType||item.version_type||'').toLowerCase();return(!filters[0].value||itemLoaders.includes(filters[0].value))&&(!filters[1].value||itemGames.includes(filters[1].value))&&(!filters[2].value||channel===filters[2].value)});
  browser.querySelector('.mist-version-count').textContent=matches.length+' versions';
  const dateLabel=value=>{if(!value)return'—';const date=new Date(value);return Number.isNaN(date.getTime())?'—':date.toLocaleDateString()};
  rows.replaceChildren(...matches.map(item=>{const row=document.createElement('div');row.className='mist-version-row';const name=document.createElement('strong');name.textContent=item.versionNumber||item.version_number||item.name||item.fileName||item.filename||'Unnamed version';const channel=document.createElement('span');channel.className='mist-version-release';channel.textContent=(item.releaseType||item.versionType||item.version_type||'Release').toString().replace(/^./,letter=>letter.toUpperCase());const date=document.createElement('span');date.textContent=dateLabel(item.publishedAt||item.datePublished||item.date_published);const game=document.createElement('span');game.textContent=(item.gameVersions||item.game_versions||[]).join(', ')||'—';const projectData=(()=>{try{return JSON.parse(detail.querySelector('.mist-project-data')?.textContent||'{}')}catch{return {}}})();const games=item.gameVersions||item.game_versions||[];const loaders=(item.loaders||item.game_loaders||[]).map(value=>String(value).toLowerCase());const incompatible=Boolean(projectData.targetGameVersion&&games.length&&!games.includes(projectData.targetGameVersion)||projectData.targetLoader&&loaders.length&&!loaders.includes(String(projectData.targetLoader).toLowerCase())&&!(projectData.targetLoader==='quilt'&&loaders.includes('fabric')));const action=document.createElement('button');action.type='button';action.textContent=incompatible?'Incompatible':'Install';action.disabled=incompatible;action.title=incompatible?'This version does not match the selected installation.':'';action.addEventListener('click',async()=>{if(action.disabled)return;action.disabled=true;action.textContent='Starting…';const selects=[...detail.querySelectorAll('.install-box select')];const select=selects.find(control=>[...control.options].some(option=>option.value===String(item.id)));if(!select){action.textContent='Install unavailable';window.setTimeout(()=>{action.textContent='Install';action.disabled=false;},1800);return;}const valueSetter=Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,'value')?.set;if(valueSetter)valueSetter.call(select,String(item.id));else select.value=String(item.id);select.dispatchEvent(new Event('input',{bubbles:true}));select.dispatchEvent(new Event('change',{bubbles:true}));await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));await new Promise(resolve=>setTimeout(resolve,80));const scope=detail.closest('.overlay')||detail.closest('.modal')||document;const installButton=[...scope.querySelectorAll('.modal-footer button')].find(button=>/install/i.test(button.textContent));if(installButton&&!installButton.disabled){installButton.click();action.textContent='Installing…';return;}action.textContent=installButton?'Check compatibility':'Install unavailable';window.setTimeout(()=>{action.textContent='Install';action.disabled=false;},1800);});row.append(name,channel,date,game,action);return row}));
}

function paintProjectChangelog(detail,data) {
  const panel=detail.querySelector('.mist-project-changelog'); if(!panel)return;
  const entries=data.filter(item=>item&&(item.changelog||item.body||item.versionNotes||item.version_notes||item.notes));
  panel.replaceChildren();
  if(!entries.length){const empty=document.createElement('p');empty.className='mist-content-state';empty.textContent='No changelog entries were provided for this project.';panel.appendChild(empty);return;}
  entries.forEach(item=>{
    const entry=document.createElement('article');entry.className='mist-changelog-entry';
    const heading=document.createElement('header');
    const title=document.createElement('strong');title.textContent=item.versionNumber||item.version_number||item.name||item.fileName||item.filename||'Version update';
    const meta=document.createElement('span');
    const date=item.publishedAt||item.datePublished||item.date_published;
    const parsed=date?new Date(date):null;
    const dateText=parsed&&!Number.isNaN(parsed.getTime())?parsed.toLocaleDateString():'';
    const channel=(item.releaseType||item.versionType||item.version_type||'').toString();
    const games=(item.gameVersions||item.game_versions||[]).join(', ');
    meta.textContent=[channel,dateText,games].filter(Boolean).join(' · ');
    heading.append(title,meta);
    const content=document.createElement('div');content.className='mist-changelog-copy';
    content.textContent=item.changelog||item.body||item.versionNotes||item.version_notes||item.notes;
    entry.append(heading,content);panel.appendChild(entry);
  });
}

function renderProjectVersions(detail) {
  const browser=detail.querySelector('.mist-version-browser'); if(!browser)return;
  let data=[]; try{data=JSON.parse(detail.querySelector('.mist-version-data')?.textContent||'[]')}catch{}
  paintProjectVersions(detail,data);
  paintProjectChangelog(detail,data);
  if(detail.dataset.mistVersionFetch)return;
  let project={}; try{project=JSON.parse(detail.querySelector('.mist-project-data')?.textContent||'{}')}catch{}
  const projectLocator=project.id||project.slug;
  if(!projectLocator||!project.source)return;
  detail.dataset.mistVersionFetch='loading';
  window.mist.catalog.versions({source:project.source,projectId:projectLocator,projectType:project.projectType||'modpack'})
    .then(remote=>{if(!detail.isConnected)return;paintProjectVersions(detail,remote||[]);paintProjectChangelog(detail,remote||[]);detail.dataset.mistVersionFetch='loaded';})
    .catch(()=>{detail.dataset.mistVersionFetch='failed';const rows=browser.querySelector('.mist-version-rows');if(rows&&!rows.childElementCount){const state=document.createElement('p');state.className='mist-content-state';state.textContent='Could not load version metadata. Check your connection and retry.';rows.appendChild(state);}});
}

function syncProjectDetails() {
  document.querySelectorAll('.project-detail').forEach((detail) => {
    const body = detail.querySelector('.project-body');
    if (body && body.dataset.mistOriginal !== body.textContent) {
      const raw = body.textContent.trim(); body.dataset.mistOriginal = raw;
      const references=new Map();
      raw.replace(/^\s*\[([^\]]+)\]:\s*<?(https?:\/\/[^\s>]+)>?(?:\s+.*)?$/gim,(_,label,url)=>{references.set(label.trim().toLowerCase(),url);return '';});
      const html = /<(?:p|div|h[1-6]|img|a|ul|ol|table|blockquote|br|center|font|span|iframe|video|source)\b/i.test(raw) ? raw : renderMarkdown(raw,references);
      const parsed = new DOMParser().parseFromString(`<div>${html}</div>`, 'text/html');
      const allowed = new Set(['P','DIV','BR','H1','H2','H3','H4','UL','OL','LI','STRONG','B','EM','I','A','IMG','BLOCKQUOTE','CODE','PRE','HR','TABLE','THEAD','TBODY','TR','TH','TD','SPAN','FONT','DETAILS','SUMMARY','IFRAME','VIDEO','SOURCE']);
      const youtubeId = (value) => {
        try {
          const url = new URL(value);
          if (!['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtube-nocookie.com', 'www.youtube-nocookie.com', 'youtu.be'].includes(url.hostname.toLowerCase())) return null;
          const id = url.hostname.toLowerCase() === 'youtu.be' ? url.pathname.split('/').filter(Boolean)[0] : url.searchParams.get('v') || url.pathname.match(/\/(?:embed|shorts|live)\/([^/?]+)/)?.[1];
          return id && /^[\w-]{11}$/.test(id) ? id : null;
        } catch { return null; }
      };
      const copy = (node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const value=node.nodeValue||'';
          if(!/[!*_`]|\[[^\]]+\](?:\(|\[)|(?:^|\n)\s*(?:#{1,6}\s|[-*+]\s|\d+\.\s)/.test(value))return document.createTextNode(value);
          let rendered=renderMarkdown(value,references);
          if(!/[\r\n]/.test(value)&&rendered.startsWith('<p>')&&rendered.endsWith('</p>'))rendered=rendered.slice(3,-4);
          const parsedText=new DOMParser().parseFromString(`<div>${rendered}</div>`,'text/html');
          const fragment=document.createDocumentFragment();
          [...(parsedText.body.firstElementChild?.childNodes||[])].forEach((child)=>fragment.appendChild(document.importNode(child,true)));
          return fragment;
        }
        if (node.nodeType !== Node.ELEMENT_NODE) return document.createDocumentFragment();
        const tag = node.tagName.toUpperCase();
        if (!allowed.has(tag)) { const fragment = document.createDocumentFragment(); [...node.childNodes].forEach((child) => fragment.appendChild(copy(child))); return fragment; }
        if (tag === 'A') {
          const href = node.getAttribute('href') || '';
          const video = youtubeId(href);
          if (video) { const frame = document.createElement('iframe'); frame.src = 'https://www.youtube.com/embed/' + encodeURIComponent(video) + '?playsinline=1&rel=0&origin=http%3A%2F%2Flocalhost'; frame.title = node.textContent.trim() || 'Embedded YouTube video'; frame.loading = 'lazy'; frame.referrerPolicy = 'strict-origin-when-cross-origin'; frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'; frame.allowFullscreen = true; return frame; }
          const link = document.createElement('a');
          if (/^https?:\/\//i.test(href)) { link.href = href; link.target = '_blank'; link.rel = 'noopener noreferrer'; }
          [...node.childNodes].forEach((child) => link.appendChild(copy(child)));
          return link;
        }
        const el = document.createElement(tag === 'FONT' ? 'span' : tag.toLowerCase());
        if (tag === 'IMG' || tag === 'IFRAME' || tag === 'SOURCE') { const src = node.getAttribute('src') || ''; const safe = tag === 'IFRAME' ? /^https:\/\/(?:www\.)?(?:youtube(?:-nocookie)?\.com|player\.vimeo\.com)\//i.test(src) : /^https:\/\//i.test(src); if (!safe) return document.createDocumentFragment(); el.src = src; if (tag === 'IMG') { el.alt = node.getAttribute('alt') || ''; el.loading = 'lazy'; } if (tag === 'IFRAME') { el.title = node.getAttribute('title') || 'Embedded project media'; el.loading = 'lazy'; el.referrerPolicy = 'strict-origin-when-cross-origin'; el.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'; el.allowFullscreen = true; } }
        if (tag === 'VIDEO') { el.controls = true; el.preload = 'metadata'; }
        if (tag === 'FONT' || tag === 'SPAN') { const family = node.getAttribute('face') || node.style?.fontFamily || ''; if (/^[\w\s,"'-]{1,100}$/.test(family)) el.style.fontFamily = family; }
        [...node.childNodes].forEach((child) => el.appendChild(copy(child)));
        return el;
      };
      body.replaceChildren(...[...parsed.body.firstElementChild.childNodes].map(copy)); body.dataset.mistDisplay = body.textContent;
    }
    if (body && body.dataset.mistDisplay === body.textContent) body.dataset.mistOriginal = body.dataset.mistDisplay;
    if (!detail.dataset.mistTabs) {
      detail.dataset.mistTabs = '1';
      const modalBody=detail.closest('.modal-body'); if(modalBody) modalBody.scrollTop=0;
      const head = detail.querySelector('.project-detail-head');
      if (head) { const tabs=document.createElement('nav'); tabs.className='mist-project-tabs'; tabs.innerHTML='<button type="button" class="is-active" data-project-tab="overview">Overview</button><button type="button" data-project-tab="gallery">Gallery</button><button type="button" data-project-tab="changelog">Changelog</button><button type="button" data-project-tab="versions">Versions</button>'; head.after(tabs);
        const sidebar=document.createElement('aside'); sidebar.className='mist-project-info'; sidebar.innerHTML='<h3>Information</h3><div class="mist-project-author"></div><div class="mist-project-meta"></div><h4>Categories</h4><div class="mist-project-categories"></div>';
        let projectData={}; try{projectData=JSON.parse(detail.querySelector('.mist-project-data')?.textContent||'{}')}catch{}
        if(projectData.projectType)detail.classList.add(`mist-project-type-${projectData.projectType}`);
        sidebar.querySelector('.mist-project-author').textContent=projectData.author||'Project details';
        sidebar.querySelector('.mist-project-meta').textContent=detail.querySelector('.project-detail-stats')?.textContent?.replace(/\s+/g,' ').trim()||'';
        sidebar.querySelector('.mist-project-categories').textContent=detail.querySelector('.project-detail-tags')?.textContent?.replace(/\s+/g,' · ').trim()||'No categories';
        detail.appendChild(sidebar);
        const apply = (name) => { tabs.querySelectorAll('button').forEach((b)=>b.classList.toggle('is-active',b.dataset.projectTab===name)); detail.classList.toggle('mist-gallery-view',name==='gallery'); detail.classList.toggle('mist-changelog-view',name==='changelog'); detail.classList.toggle('mist-versions-view',name==='versions'); };
        tabs.addEventListener('click',(event)=>{const b=event.target.closest('[data-project-tab]');if(b)apply(b.dataset.projectTab);});
      }
      detail.querySelectorAll('.field').forEach((field)=>{if (/^pack version$/i.test(field.querySelector('label')?.textContent?.trim()||'')) field.classList.add('mist-pack-version-source');});
      detail.querySelectorAll('.install-box .field').forEach((field)=>{if(/^install to$/i.test(field.querySelector('label')?.textContent?.trim()||''))field.classList.add('mist-install-target-field');});
      detail.querySelectorAll('.changelog').forEach((item)=>item.classList.add('mist-version-changelog-source'));
      let gallery = detail.querySelector('.gallery');
      if (!gallery) { gallery = document.createElement('div'); gallery.className = 'gallery'; const tab = detail.querySelector('.mist-project-tabs'); if (tab) tab.after(gallery); else detail.appendChild(gallery); }
      if (gallery.dataset.mistBuilt !== '1') {
        gallery.dataset.mistBuilt = '1';
        let galleryData=[]; try { galleryData=JSON.parse(detail.querySelector('.mist-gallery-data')?.textContent||'[]'); } catch {}
        const images = [...(body || detail).querySelectorAll('img')];
        galleryData.forEach((image)=>{if(!/^https:\/\//i.test(image.url||'')||[...gallery.querySelectorAll('img')].some((entry)=>entry.src===image.url))return;const img=document.createElement('img');img.src=image.url;img.alt=image.title||image.description||'';img.loading='lazy';gallery.appendChild(img);});
        if (!gallery.querySelector('img')) { const empty=document.createElement('p'); empty.className='mist-content-state'; empty.textContent='No gallery images were provided for this project.'; gallery.appendChild(empty); }
      }
      let changelog=detail.querySelector('.mist-project-changelog');
      if(!changelog){changelog=document.createElement('section');changelog.className='mist-project-changelog';changelog.setAttribute('aria-label','Project changelog');const tab=detail.querySelector('.mist-project-tabs');if(tab)tab.after(changelog);else detail.appendChild(changelog);}
      let versions = detail.querySelector('.mist-version-browser');
      if (!versions) {
        versions = document.createElement('section'); versions.className='mist-version-browser';
        versions.innerHTML='<div class="mist-version-filters"><select aria-label="Filter by loader"><option value="">Any loader</option><option>Fabric</option><option>Forge</option><option>NeoForge</option><option>Quilt</option></select><select aria-label="Filter by game version"><option value="">Any version</option></select><select aria-label="Filter by channel"><option value="">Any channel</option><option>Release</option><option>Beta</option><option>Alpha</option></select><span class="mist-version-count"></span></div><div class="mist-version-table"><div class="mist-version-table-head"><span>Version</span><span>Channel</span><span>Date</span><span>Game versions</span><span>Action</span></div><div class="mist-version-rows"></div></div>';
        const tab=detail.querySelector('.mist-project-tabs'); if(tab) tab.after(versions); else detail.appendChild(versions);
      }
    }
    renderProjectVersions(detail);
  });
}

function syncModReviewDock(home) {
  let dock = document.getElementById('mist-home-mod-review');
  if (!dock) {
    dock = document.createElement('section'); dock.id='mist-home-mod-review'; dock.setAttribute('aria-label','Minecraft mod review videos');
    dock.innerHTML = `<header class="mist-review-heading"><div><strong>Mod Reviews</strong><small>Discover Minecraft mods through community videos</small></div><label class="mist-review-search"><span>${svg('search')}</span><input type="search" placeholder="Search Cobblemon, Create, Sodium…" aria-label="Search mod showcases"></label><button type="button" data-review-search>Search</button></header><div class="mist-review-body"><div class="mist-review-player"><div class="mist-review-frame"><iframe title="Minecraft mod showcase" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe><button type="button" class="mist-review-play" aria-label="Play video">▶</button></div><div class="mist-review-now"><strong></strong><small></small></div></div><div class="mist-review-results" role="list"></div><aside class="mist-review-details"><strong>In this video</strong><p></p><div class="mist-review-tags"></div></aside></div>`;
    document.body.appendChild(dock);
    const frame=dock.querySelector('iframe'), results=dock.querySelector('.mist-review-results'), search=dock.querySelector('input'), title=dock.querySelector('.mist-review-now strong'), creator=dock.querySelector('.mist-review-now small'), details=dock.querySelector('.mist-review-details p'), tags=dock.querySelector('.mist-review-tags'), play=dock.querySelector('.mist-review-play');
    let selected=MOD_SHOWCASES[0];
    const videoUrl=(item,autoplay=false)=>{const params=new URLSearchParams({controls:'1',rel:'0',playsinline:'1',enablejsapi:'1',origin:'http://localhost',...(autoplay?{autoplay:'1'}:{})});return `https://www.youtube.com/embed/${encodeURIComponent(item.id)}?${params}`;};
    frame.allow='autoplay; encrypted-media; picture-in-picture; web-share';frame.referrerPolicy='strict-origin-when-cross-origin';
    const selectVideo=(item)=>{selected=item;title.textContent=item.title;creator.textContent=`${item.creator} · YouTube`;details.textContent=item.summary;tags.replaceChildren(...item.contents.map((value)=>{const tag=document.createElement('span');tag.textContent=value;return tag;}));frame.src=videoUrl(item);play.textContent='▶';play.hidden=false;play.setAttribute('aria-label',`Play ${item.title}`);results.querySelectorAll('[data-video-id]').forEach((button)=>button.classList.toggle('is-active',button.dataset.videoId===item.id));};
    const paintResults=()=>{const query=search.value.trim().toLocaleLowerCase();const matches=MOD_SHOWCASES.filter((item)=>`${item.title} ${item.tags.join(' ')} ${item.creator}`.toLocaleLowerCase().includes(query));results.replaceChildren();matches.forEach((item)=>{const card=document.createElement('button');card.type='button';card.className='mist-review-result';card.dataset.videoId=item.id;card.setAttribute('role','listitem');const img=document.createElement('img');img.src=`https://img.youtube.com/vi/${item.id}/mqdefault.jpg`;img.alt='';const copy=document.createElement('span');copy.innerHTML='<strong></strong><small></small>';copy.querySelector('strong').textContent=item.title;copy.querySelector('small').textContent=`${item.creator} · ${item.tags.slice(0,2).join(' · ')}`;card.append(img,copy);card.addEventListener('click',()=>selectVideo(item));results.appendChild(card);});if(!matches.length){const empty=document.createElement('p');empty.className='mist-review-empty';empty.textContent='No saved showcases match. Search YouTube for more videos.';results.appendChild(empty);}return matches.length;};
    search.addEventListener('input',paintResults);dock.querySelector('[data-review-search]').addEventListener('click',()=>{if(!search.value.trim()){search.focus();return;}paintResults();});
    play.addEventListener('click',()=>{if(!selected)return;frame.src=videoUrl(selected,true);play.hidden=true;});
    paintResults();selectVideo(selected);
  }
  const homeRoot=document.querySelector('.home-screen');
  if(home&&homeRoot&&dock.parentElement!==homeRoot)homeRoot.appendChild(dock);
  else if(!home&&dock.parentElement!==document.body)document.body.appendChild(dock);
  dock.hidden=!home;
}

function syncInstanceViews() {
  const screen = document.querySelector('.detail-screen');
  const navId = 'mist-instance-settings-nav';
  const nav = document.getElementById(navId);
  if (!screen) {
    nav?.remove();
    document.getElementById('mist-instance-overview')?.remove();
    document.body?.removeAttribute('data-mist-instance-settings');
    return;
  }

  const actions = screen.querySelector('.detail-actions');
  if (actions && !actions.querySelector('.instance-settings-trigger')) {
    const settings = document.createElement('button');
    settings.type = 'button'; settings.className = 'btn btn-secondary instance-settings-trigger';
    settings.innerHTML = `${svg('gear')}<span>Instance Settings</span>`;
    settings.addEventListener('click', () => {
      document.body.dataset.mistInstanceSettings = 'open';
      screen.classList.add('is-settings-view');
      syncInstanceViews();
    });
    actions.prepend(settings);
  }

  let overview = document.getElementById('mist-instance-overview');
  if (!overview) {
    overview = document.createElement('section'); overview.id = 'mist-instance-overview';
    overview.innerHTML = `<div class="mist-instance-overview-title"><div><span class="mist-instance-kicker">MIST LIBRARY</span><h2>Installed content</h2><p>Live files for this installation. Toggle supported items without leaving this page.</p></div><button type="button" class="mist-content-refresh">Refresh</button></div><div class="mist-content-tabs" role="tablist"><button type="button" data-content-tab="content">Content</button><button type="button" data-content-tab="worlds">Worlds</button><button type="button" data-content-tab="gallery">Gallery</button><button type="button" data-content-tab="files">Files</button></div><div class="mist-content-types" role="tablist"><button type="button" data-content-type="mods">Mods</button><button type="button" data-content-type="resourcepacks">Resource Packs</button><button type="button" data-content-type="shaders">Shaders</button></div><div class="mist-instance-content" aria-live="polite"></div>`;
    screen.appendChild(overview);
  }
  const match = window.location.hash.match(/^#\/installations\/([^/?]+)/);
  const installationId = match ? decodeURIComponent(match[1]) : '';
  const content = overview.querySelector('.mist-instance-content');
  const loadContent = async (force = false) => {
    if (!installationId || !content) return;
    const tab = overview.dataset.contentTab || 'content';
    const type = overview.dataset.contentType || 'mods';
    const key = `${installationId}:${tab}:${type}`;
    if (!force && content.dataset.key === key) return;
    content.dataset.key = key; content.replaceChildren();
    const loading = document.createElement('p'); loading.className = 'mist-content-state'; loading.textContent = 'Reading installation files…'; content.appendChild(loading);
    const makeRow = (title, filename, meta, enabled, onToggle, onOpen) => {
      const row = document.createElement('article'); row.className = `mist-content-row${enabled === false ? ' is-disabled' : ''}`;
      const icon = document.createElement('span'); icon.className = 'mist-content-file-icon'; icon.innerHTML = svg(type === 'worlds' ? 'world' : type === 'resourcepacks' ? 'skin' : type === 'shaders' ? 'gear' : 'pack');
      const copy = document.createElement('span'); copy.className = 'mist-content-file-copy';
      const strong = document.createElement('strong'); strong.textContent = title || filename || 'Untitled';
      const sub = document.createElement('small'); sub.textContent = [filename, meta].filter(Boolean).join(' · ');
      copy.append(strong, sub); row.append(icon, copy);
      if (typeof onToggle === 'function') {
        const toggle = document.createElement('button'); toggle.type = 'button'; toggle.className = `mist-content-toggle${enabled ? ' is-on' : ''}`;
        toggle.setAttribute('role','switch'); toggle.setAttribute('aria-checked',String(Boolean(enabled))); toggle.setAttribute('aria-label',`${enabled ? 'Disable' : 'Enable'} ${title}`);
        toggle.addEventListener('click', async () => { toggle.disabled = true; try { await onToggle(!enabled); await loadContent(true); } catch (error) { sub.textContent = error instanceof Error ? error.message : 'Could not update this file'; toggle.disabled = false; } });
        row.appendChild(toggle);
      } else if (onOpen) {
        const open = document.createElement('button'); open.type = 'button'; open.className = 'mist-content-open'; open.textContent = 'Open folder'; open.addEventListener('click', onOpen); row.appendChild(open);
      } else if (enabled !== undefined) {
        const state = document.createElement('span'); state.className = 'mist-content-state-label'; state.textContent = enabled ? 'Enabled' : 'Disabled'; row.appendChild(state);
      }
      return row;
    };
    try {
      const api = window.mist;
      let items = [];
      if (tab === 'worlds') {
        items = await api.worlds.list(installationId);
        content.replaceChildren();
        items.forEach((world) => content.appendChild(makeRow(world.name, world.folder, `${world.versionName || 'Minecraft world'} · ${world.sizeBytes || 0} bytes`, undefined, null, () => api.worlds.openFolder(installationId, world.folder))));
        if (!items.length) content.textContent = 'No worlds found in this installation yet.';
      } else if (tab === 'gallery') {
        content.replaceChildren();
        const gallery = document.createElement('div'); gallery.className = 'mist-content-gallery';
        const message = document.createElement('p'); message.textContent = 'Screenshots are stored in this installation’s screenshots folder.';
        const open = document.createElement('button'); open.type = 'button'; open.className = 'mist-content-open'; open.textContent = 'Open screenshots folder';
        open.addEventListener('click', () => api.app.openScreenshotsFolder(installationId)); gallery.append(message, open); content.appendChild(gallery);
      } else if (tab === 'files') {
        content.replaceChildren();
        const browser = document.createElement('section'); browser.className = 'mist-file-manager';
        browser.innerHTML = `<div class="mist-file-toolbar"><div><strong>Files</strong><nav class="mist-file-breadcrumb" aria-label="Current folder"></nav></div><div class="mist-file-actions"><input type="search" placeholder="Filter files in this folder" aria-label="Filter files in this folder"><button type="button" data-file-folder title="Open installation folder">Open folder</button><button type="button" data-file-refresh title="Refresh">Refresh</button></div></div><div class="mist-file-table"><div class="mist-file-table-head"><span>Name</span><span>Size</span><span>Modified</span></div><div class="mist-file-table-body"></div></div><footer class="mist-file-count"></footer>`;
        content.appendChild(browser);
        const bread = browser.querySelector('.mist-file-breadcrumb'), body = browser.querySelector('.mist-file-table-body'), search = browser.querySelector('input'), count = browser.querySelector('.mist-file-count');
        let filePath = overview.dataset.filePath || '';
        const renderDirectory = async (nextPath = filePath) => {
          filePath = nextPath; overview.dataset.filePath = filePath; body.textContent = 'Loading files…';
          bread.replaceChildren();
          const rootCrumb = document.createElement('button'); rootCrumb.textContent = 'Installation'; rootCrumb.addEventListener('click', () => renderDirectory('')); bread.appendChild(rootCrumb);
          let accumulated = '';
          filePath.split('/').filter(Boolean).forEach((part) => { accumulated = accumulated ? `${accumulated}/${part}` : part; const pathAtClick = accumulated; const crumb = document.createElement('span'); crumb.textContent = ' / '; bread.append(crumb); const button = document.createElement('button'); button.textContent = part; button.addEventListener('click', () => renderDirectory(pathAtClick)); bread.appendChild(button); });
          try {
            const result = await api.installations.listDirectory(installationId, filePath); body.replaceChildren();
            const draw = () => {
              body.replaceChildren(); const query = search.value.trim().toLocaleLowerCase();
              const visible = result.entries.filter((entry) => entry.name.toLocaleLowerCase().includes(query));
              visible.forEach((entry) => {
                const row = document.createElement('button'); row.type = 'button'; row.className = `mist-file-row is-${entry.kind}`;
                const name = document.createElement('span'); name.className = 'mist-file-name'; name.innerHTML = entry.kind === 'directory' ? `${svg('world')}<span></span>` : `${svg('changes')}<span></span>`; name.lastElementChild.textContent = entry.name;
                const size = document.createElement('span'); size.textContent = entry.kind === 'directory' ? '—' : formatBytes(entry.size);
                const modified = document.createElement('span'); modified.textContent = entry.modifiedAt ? new Date(entry.modifiedAt).toLocaleDateString() : '—';
                row.append(name, size, modified); row.addEventListener('dblclick', () => entry.kind === 'directory' ? renderDirectory(entry.relativePath) : api.installations.openEntry(installationId, entry.relativePath));
                row.addEventListener('click', () => { if (entry.kind === 'directory') renderDirectory(entry.relativePath); else api.installations.openEntry(installationId, entry.relativePath); }); body.appendChild(row);
              });
              count.textContent = `${visible.length} item${visible.length === 1 ? '' : 's'}${query ? ` · ${result.entries.length} total` : ''}`;
              if (!visible.length) body.textContent = query ? 'No files match this filter.' : 'This folder is empty.';
            };
            draw(); search.oninput = draw;
          } catch (error) { body.textContent = error instanceof Error ? error.message : 'Could not read this folder.'; }
        };
        browser.querySelector('[data-file-refresh]').addEventListener('click', () => renderDirectory(filePath));
        browser.querySelector('[data-file-folder]').addEventListener('click', () => api.installations.openFolder(installationId));
        void renderDirectory(filePath);
      } else {
        const loaders = {mods: api.mods, resourcepacks: api.resourcepacks, shaders: api.shaders};
        const service = loaders[type]; items = await service.list(installationId);
        content.replaceChildren();
        items.forEach((item) => {
          const canToggle = true;
          const setEnabled = type === 'mods' ? (enabled) => api.mods.setEnabled(installationId,item.filename,enabled) : type === 'resourcepacks' ? (enabled) => api.resourcepacks.setEnabled(installationId,item.filename,enabled) : (enabled) => api.shaders.setEnabled(installationId,item.filename,enabled);
          const open = type === 'mods' ? () => api.mods.openFolder(installationId) : type === 'resourcepacks' ? () => api.resourcepacks.openFolder(installationId) : () => api.shaders.openFolder(installationId);
          content.appendChild(makeRow(item.name || item.filename,item.filename,`${item.versionNumber || item.packFormat || item.source || ''}${item.size ? ` · ${item.size} bytes` : ''}`,item.enabled,canToggle ? setEnabled : null,canToggle ? null : open));
        });
        if (!items.length) content.textContent = `No ${type === 'resourcepacks' ? 'resource packs' : type} installed in this instance.`;
      }
    } catch (error) {
      content.replaceChildren(); const state = document.createElement('p'); state.className = 'mist-content-state'; state.textContent = error instanceof Error ? error.message : 'Could not read instance files.'; content.appendChild(state);
    }
  };
  if (overview.dataset.instanceId !== installationId) {
    overview.dataset.instanceId = installationId; overview.dataset.filePath = ''; overview.dataset.contentTab = 'content'; overview.dataset.contentType = 'mods';
    overview.querySelectorAll('[data-content-tab]').forEach((button) => button.addEventListener('click', () => { overview.dataset.contentTab = button.dataset.contentTab; overview.querySelectorAll('[data-content-tab]').forEach((item) => item.classList.toggle('is-active', item === button)); overview.querySelector('.mist-content-types').hidden = button.dataset.contentTab !== 'content'; loadContent(true); }));
    overview.querySelectorAll('[data-content-type]').forEach((button) => button.addEventListener('click', () => { overview.dataset.contentType = button.dataset.contentType; overview.querySelectorAll('[data-content-type]').forEach((item) => item.classList.toggle('is-active', item === button)); loadContent(true); }));
    overview.querySelector('.mist-content-refresh')?.addEventListener('click', () => loadContent(true));
    overview.querySelector('[data-content-tab="content"]')?.classList.add('is-active'); overview.querySelector('[data-content-type="mods"]')?.classList.add('is-active');
    void loadContent(true);
  }

  const sections = [...screen.querySelectorAll('.detail-main > section')];
  const definitions = [
    { key: 'general', label: 'General', title: 'Installation' },
    { key: 'java', label: 'Game & Java', title: 'Game & Java' },
    { key: 'remove', label: 'Advanced', title: 'Remove installation' }
  ];
  definitions.forEach((definition) => {
    const section = sections.find((item) => item.querySelector('.section-header h2,.section-header h3,h2,h3')?.textContent.trim() === definition.title);
    if (section) section.dataset.mistSettingSection = definition.key;
  });

  let currentNav = document.getElementById(navId);
  if (!currentNav) {
    currentNav = document.createElement('aside'); currentNav.id = navId; currentNav.setAttribute('aria-label', 'Instance settings');
    currentNav.innerHTML = `<header><strong>Instance Settings</strong><button type="button" class="mist-settings-back">← Back to instance</button></header><nav></nav>`;
    currentNav.querySelector('.mist-settings-back').addEventListener('click', () => {
      document.body.removeAttribute('data-mist-instance-settings'); screen.classList.remove('is-settings-view');
      syncInstanceViews();
    });
    currentNav.querySelector('nav').innerHTML = definitions.map((item) => `<button type="button" data-setting-key="${item.key}"><span>${svg(item.key === 'general' ? 'user' : item.key === 'java' ? 'gear' : 'changes')}</span>${item.label}</button>`).join('');
    currentNav.querySelectorAll('[data-setting-key]').forEach((button) => button.addEventListener('click', () => {
      currentNav.dataset.active = button.dataset.settingKey;
      sections.forEach((section) => section.hidden = section.dataset.mistSettingSection !== button.dataset.settingKey);
    }));
    document.body.appendChild(currentNav);
  }

  const settingsOpen = document.body.dataset.mistInstanceSettings === 'open';
  screen.classList.toggle('is-settings-view', settingsOpen);
  currentNav.hidden = !settingsOpen;
  overview.hidden = settingsOpen;
  if (settingsOpen) {
    const active = currentNav.dataset.active || 'general'; currentNav.dataset.active = active;
    currentNav.querySelectorAll('[data-setting-key]').forEach((button) => button.classList.toggle('is-active', button.dataset.settingKey === active));
    sections.forEach((section) => section.hidden = section.dataset.mistSettingSection !== active);
  } else sections.forEach((section) => section.hidden = false);
}

function makeButton({ className, label, icon, action, title = label }) {
  const button = document.createElement('button');
  button.type = 'button'; button.className = className; button.setAttribute('aria-label', label); button.title = title;
  if (icon) button.innerHTML = svg(icon);
  const tooltip = document.createElement('span');
  tooltip.className = 'mist-dock-tooltip'; tooltip.setAttribute('role', 'tooltip'); tooltip.textContent = label;
  button.appendChild(tooltip);
  button.addEventListener('click', action);
  return button;
}

function installDock() {
  const root = document.getElementById('root');
  if (!root || !document.body) return false;
  const routeIcons = [
    [/versions?/i,'routeVersions'],[/modpacks?/i,'routeModpacks'],[/^mods?$/i,'routeMods'],
    [/resource\s*packs?/i,'routeResources'],[/shaders?/i,'routeShaders'],[/world\s*chat/i,'routeChat'],[/^worlds?$/i,'routeWorlds'],
    [/skins?/i,'routeSkins'],[/capes?/i,'routeCapes']
  ];
  const routeIconOrder = ['routeVersions','routeModpacks','routeMods','routeResources','routeShaders','routeWorlds','routeChat','routeSkins','routeCapes'];
  document.querySelectorAll('.top-route-nav .top-route-item').forEach((item, index) => {
    const label = item.getAttribute('aria-label') || item.title || item.textContent || '';
    const entry = routeIcons.find(([pattern]) => pattern.test(label.trim()));
    const glyph = routeIconOrder[index] || entry?.[1];
    if (!glyph || item.dataset.mistRouteGlyph === glyph) return;
    const oldGlyph = item.querySelector('svg');
    if (!oldGlyph) return;
    const holder = document.createElement('span'); holder.innerHTML = svg(glyph);
    oldGlyph.replaceWith(holder.firstElementChild); item.dataset.mistRouteGlyph = glyph;
    if (!item.title) item.title = label.trim();
    item.setAttribute('aria-label', label.trim());
  });
  let dock = document.getElementById('mist-left-dock');
  if (!dock) {
    dock = document.createElement('nav'); dock.id = 'mist-left-dock'; dock.setAttribute('aria-label', 'Mist Launcher shortcuts');
    document.body.appendChild(dock);
  }
  const makeRoute = (label, icon, selectors) => makeButton({
    className: 'mist-dock-item', label, icon,
    action: () => clickExisting(selectors),
    title: `${label} · launcher shortcut`
  });
  const account = makeButton({
    className: 'mist-dock-account', label: 'Account', icon: 'user',
    action: () => clickExisting(['.bottom-navigation-item.bottom-account-item', '.titlebar-profile-button']),
    title: 'Open account'
  });
  const accountImage = document.querySelector('.bottom-account-item img, .home-account-card img');
  if (accountImage) {
    const avatar = accountImage.cloneNode(); avatar.alt = '';
    const tooltip = account.querySelector('.mist-dock-tooltip');
    tooltip.textContent = document.querySelector('.home-account-copy strong')?.textContent?.trim() || 'Account';
    account.replaceChildren(avatar, tooltip);
  }
  const homeButton = makeButton({ className: 'mist-dock-item', label: 'Home', icon: 'home', action: () => clickExisting(['.bottom-navigation-item[aria-label="Home"]']) });

  const create = makeButton({
    className: 'mist-dock-create', label: 'Create installation', icon: 'plus',
    action: () => {
      if (clickExisting(['.create-install-cta', '.create-install-button', '[aria-label="Open the new installation dialog"]', '[aria-label*="Create an installation" i]'])) return;
      const openedInstallations = clickExisting(['.bottom-navigation-item[aria-label="Installations"]']);
      if (openedInstallations) window.setTimeout(() => clickExisting(['.create-install-cta', '.create-install-button', '[aria-label="Open the new installation dialog"]', '[aria-label*="Create an installation" i]']), 220);
    }, title: 'Create a new Minecraft installation'
  });
  const settings = makeButton({
    className: 'mist-dock-settings', label: 'Settings', icon: 'gear',
    action: () => clickExisting(['.bottom-navigation-item[aria-label="Settings"]'])
  });

  const sourceButtons = [...document.querySelectorAll('.installation-shelf-button')];
  const routeNav = document.querySelector('.titlebar > .top-route-nav');

  if (routeNav) {
    let footer = routeNav.querySelector('.mist-route-footer');
    if (!footer) { footer = document.createElement('div'); footer.className = 'mist-route-footer'; footer.setAttribute('aria-label', 'Account and settings'); routeNav.appendChild(footer); }
    const accountSignature = `${accountImage?.src || ''}|${document.querySelector('.home-account-copy strong')?.textContent?.trim() || ''}`;
    if (footer.dataset.signature !== accountSignature) {
      footer.replaceChildren(account, settings);
      footer.dataset.signature = accountSignature;
    }
  }

  // The centered shortcut dock duplicated navigation and instance controls.
  // Home/Create now live in the category rail; instance browsing lives on Home.
  dock.replaceChildren();
  dock.hidden = true;
  const home = Boolean(document.querySelector('.home-screen'));
  if (routeNav) {
    let header = routeNav.querySelector('.mist-route-header');
    if (!header) { header = document.createElement('div'); header.className = 'mist-route-header'; header.setAttribute('aria-label', 'Home shortcuts'); }
    if (header.dataset.ready !== 'true') {
      header.replaceChildren(homeButton, create);
      header.dataset.ready = 'true';
    }
    const firstRoute = routeNav.querySelector('.top-route-item');
    if (firstRoute && firstRoute.previousElementSibling !== header) routeNav.insertBefore(header, firstRoute);
    else if (!firstRoute && header.parentElement !== routeNav) routeNav.prepend(header);
  }
  syncBrowseInstances(home);
  syncPlayInstanceMenu(home, sourceButtons);
  const homeMain=document.querySelector('.main');
  if(home&&homeMain&&homeMain.dataset.mistHomeScrollReady!=='1'){
    homeMain.dataset.mistHomeScrollReady='1';
    requestAnimationFrame(()=>{if(document.querySelector('.home-screen'))homeMain.scrollTo({top:0,left:0,behavior:'instant'});});
    setTimeout(()=>{if(document.querySelector('.home-screen'))homeMain.scrollTo({top:0,left:0,behavior:'instant'});},220);
    setTimeout(()=>{if(document.querySelector('.home-screen'))homeMain.scrollTo({top:0,left:0,behavior:'instant'});},620);
  }else if(!home&&homeMain){delete homeMain.dataset.mistHomeScrollReady;}
  syncProjectArt();
  syncPopularCategories();
  syncProjectDetails();
  syncModReviewDock(home);
  const oldHomeNews = document.getElementById('mist-home-main-news'); if (oldHomeNews) oldHomeNews.hidden = true;
  if (home) document.querySelectorAll('.home-screen .hero-warning').forEach((warning) => { if (/game files need to be downloaded/i.test(warning.textContent)) warning.hidden = true; });
  syncInstanceViews();
  let sharedNews = document.getElementById('mist-shared-news-rail');
  if (!sharedNews) {
    sharedNews = document.createElement('aside'); sharedNews.id = 'mist-shared-news-rail';
    sharedNews.setAttribute('aria-label', 'Minecraft news'); document.body.appendChild(sharedNews);
  }
  const newsSource = document.querySelector('.home-news-sidebar');
  if (newsSource) {
    const signature = newsSource.innerHTML;
    if (sharedNews.dataset.signature !== signature) {
      const snapshot = newsSource.cloneNode(true);
      snapshot.removeAttribute('id');
      snapshot.querySelectorAll('button').forEach((button) => { button.disabled = false; button.tabIndex = -1; });
      sharedNews.replaceChildren(snapshot); sharedNews.dataset.signature = signature;
    }
  }
  sharedNews.hidden = home || !document.querySelector('.installation-grid, .detail-screen') || !sharedNews.firstElementChild;
  let mainNews = document.getElementById('mist-home-main-news');
  if (!mainNews) { mainNews = document.createElement('section'); mainNews.id = 'mist-home-main-news'; mainNews.setAttribute('aria-label', 'Latest Minecraft news'); document.body.appendChild(mainNews); }
  if (newsSource) {
    const signature = newsSource.innerHTML;
    if (mainNews.dataset.signature !== signature) {
      const snapshot = newsSource.cloneNode(true);
      snapshot.removeAttribute('id');
      snapshot.querySelectorAll('button').forEach((button, index) => {
        const original = newsSource.querySelectorAll('button')[index];
        button.addEventListener('click', () => original?.click());
      });
      mainNews.replaceChildren(snapshot); mainNews.dataset.signature = signature;
    }
  }
  mainNews.hidden = !home || !mainNews.firstElementChild;
  let bottom = document.getElementById('mist-home-bottom-dock');
  if (!bottom) {
    bottom = document.createElement('div'); bottom.id = 'mist-home-bottom-dock'; bottom.setAttribute('aria-label', 'Game controls');
    const manage = makeButton({ className: 'mist-bottom-manage', label: 'Manage instance', icon: 'manage', action: openSelectedInstance });
    manage.insertBefore(document.createTextNode('Manage'), manage.querySelector('.mist-dock-tooltip'));
    const play = makeButton({ className: 'mist-bottom-play', label: 'Play', icon: 'play', action: () => togglePlayInstanceMenu() });
    const selected = document.createElement('div'); selected.className = 'mist-bottom-selected'; selected.setAttribute('aria-live', 'polite');
    bottom.append(manage, play, selected); document.body.appendChild(bottom);
  }
  bottom.hidden = !home;
  updateSelectedInstallation(bottom);
  return true;
}

function syncBrowseInstances(home) {
  const featured = document.querySelector('.home-featured-sidebar');
  if (!featured) return;
  const heading = featured.querySelector('.home-news-sidebar-heading');
  if (!heading) return;
  let button = heading.querySelector('.mist-browse-instances');
  if (!button) {
    button = makeButton({ className: 'mist-browse-instances', label: 'Browse instances', icon: 'install', action: () => clickExisting(['.bottom-navigation-item[aria-label="Installations"]']) });
    button.insertBefore(document.createTextNode('Browse instances'), button.querySelector('.mist-dock-tooltip'));
    heading.prepend(button);
  }
  button.hidden = !home;
}

function ensurePlayInstanceMenu() {
  let menu = document.getElementById('mist-play-instance-menu');
  if (menu) return menu;
  menu = document.createElement('section'); menu.id = 'mist-play-instance-menu'; menu.hidden = true;
  menu.setAttribute('role','dialog'); menu.setAttribute('aria-label','Choose an installation to play');
  menu.innerHTML = '<div class="mist-play-menu-heading"><strong>Choose an instance</strong><button type="button" class="mist-play-menu-close" aria-label="Close">×</button></div><div class="mist-play-menu-list"></div>';
  menu.querySelector('.mist-play-menu-close').addEventListener('click', () => { menu.hidden = true; });
  document.body.appendChild(menu);
  if (!document.documentElement.dataset.mistPlayMenuEvents) {
    document.documentElement.dataset.mistPlayMenuEvents = '1';
    document.addEventListener('pointerdown', (event) => {
      const current = document.getElementById('mist-play-instance-menu');
      if (current && !current.hidden && !current.contains(event.target) && !event.target.closest('#mist-home-bottom-dock .mist-bottom-play')) current.hidden = true;
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') { const current = document.getElementById('mist-play-instance-menu'); if (current) current.hidden = true; }
    });
  }
  return menu;
}

function togglePlayInstanceMenu() {
  const menu = ensurePlayInstanceMenu();
  const play = document.querySelector('#mist-home-bottom-dock .mist-bottom-play');
  const list = menu.querySelector('.mist-play-menu-list');
  const sources = [...document.querySelectorAll('.installation-shelf-button')];
  list.replaceChildren();
  if (!sources.length) {
    const empty = document.createElement('p'); empty.className = 'mist-play-menu-empty'; empty.textContent = 'No installations yet.';
    const browse = document.createElement('button'); browse.type = 'button'; browse.className = 'mist-play-menu-browse'; browse.textContent = 'Browse instances';
    browse.addEventListener('click', () => { menu.hidden = true; clickExisting(['.bottom-navigation-item[aria-label="Installations"]']); });
    list.append(empty, browse);
  } else {
    sources.forEach((source, index) => {
      const label = source.getAttribute('aria-label') || source.textContent.trim() || `Installation ${index + 1}`;
      const row = document.createElement('button'); row.type = 'button'; row.className = 'mist-play-instance-option';
      const art = source.querySelector('.install-art, img, [class*="install-icon"]');
      if (art) row.appendChild(art.cloneNode(true));
      const copy = document.createElement('span'); copy.textContent = label.replace(/^Select\s+/i,''); row.appendChild(copy);
      if (source.getAttribute('aria-pressed') === 'true' || source.classList.contains('is-selected')) row.setAttribute('aria-current','true');
      row.addEventListener('click', () => {
        menu.hidden = true;
        source.click();
        window.setTimeout(() => clickExisting(['.home-play-controls .play-button']), 260);
      });
      list.appendChild(row);
    });
  }
  menu.hidden = !menu.hidden;
  if (!menu.hidden && play) {
    const rect = play.getBoundingClientRect();
    menu.style.left = `${Math.max(12,Math.min(rect.left + rect.width / 2 - 155,window.innerWidth - 322))}px`;
    menu.style.bottom = `${Math.max(82,window.innerHeight - rect.top + 10)}px`;
  }
}

function syncPlayInstanceMenu(home, sources) {
  const menu = ensurePlayInstanceMenu();
  if (!home) menu.hidden = true;
  const button = document.querySelector('#mist-home-bottom-dock .mist-bottom-play');
  if (button) button.setAttribute('aria-haspopup','dialog');
}
function updateSelectedInstallation(bottom) {
  const target = bottom.querySelector('.mist-bottom-selected');
  const source = document.querySelector('.home-selected-installation');
  if (!target || !source) { if (target) target.replaceChildren(); return; }
  const signature = source.textContent.trim() + (source.querySelector('img')?.src || '');
  if (target.dataset.signature === signature) return;
  target.dataset.signature = signature;
  const art = source.querySelector('.install-art, .installation-art, img, [class*="install-icon"]');
  const copy = source.querySelector('.home-selected-installation-copy');
  target.replaceChildren();
  if (art) target.appendChild(art.cloneNode(true));
  if (copy) { const copyClone = copy.cloneNode(true); copyClone.className = 'mist-bottom-selected-copy'; target.appendChild(copyClone); }
  if (!copy) target.append(document.createTextNode(source.textContent.trim()));
}

function openSelectedInstance() {
  const selected = document.querySelector('.home-selected-installation-copy strong')?.textContent?.trim();
  const current = [...document.querySelectorAll('.installation-shelf-button')].find((button) =>
    button.getAttribute('aria-pressed') === 'true' || button.classList.contains('is-selected'));
  const label = selected || current?.getAttribute('aria-label');
  clickExisting(['.bottom-navigation-item[aria-label="Installations"]']);
  window.setTimeout(() => {
    const cards = [...document.querySelectorAll('.installation-card:not(.add-card)')];
    const card = cards.find((item) => selected && item.textContent.includes(selected))
      || cards.find((item) => label && item.textContent.includes(label))
      || cards[0];
    const manage = card && [...card.querySelectorAll('button')].find((button) => /manage/i.test(button.textContent));
    if (manage) manage.click();
  }, 260);
}

function start() {
  const schedule = () => window.requestAnimationFrame(installDock);
  schedule();
  let queued = false;
  const observer = new MutationObserver(() => {
    if (queued) return;
    queued = true;
    window.setTimeout(() => { queued = false; installDock(); }, 60);
  });
  const root = document.getElementById('root');
  if (root) observer.observe(root, { childList: true, subtree: true, attributes: true, attributeFilter: ['aria-current', 'aria-pressed', 'class'] });
  // Project dialogs are rendered through a React portal directly under body,
  // outside #root. Watch those portal updates so async project data receives
  // its rich Markdown renderer and the Overview / Gallery / Versions tabs.
  let projectSyncQueued = false;
  const projectObserver = new MutationObserver(() => {
    if (projectSyncQueued) return;
    projectSyncQueued = true;
    window.setTimeout(() => {
      projectSyncQueued = false;
      syncProjectDetails();
    }, 50);
  });
  projectObserver.observe(document.body, { childList: true, subtree: true });
  document.addEventListener('click', (event) => {
  });
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true }); else start();
