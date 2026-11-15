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
  routeCapes: '<path d="m8 4 4 2 4-2 4 3-2 14H6L4 7z"/><path d="M8 4v5l4 3 4-3V4M12 12v9"/><path d="m9 16 3 2 3-2"/>',
  routeDatapacks: '<ellipse cx="12" cy="5.5" rx="7.5" ry="3"/><path d="M4.5 5.5v13c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-13"/><path d="M4.5 11.5c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3"/>',
  github: '<path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z"/>',
  globe: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 8.5h18M8 4.5v15"/>',
  chevronRight: '<path d="m9 6 6 6-6 6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  back: '<path d="M15 18l-6-6 6-6"/>',
  download: '<path d="M12 4v12m-4.5-4.5L12 16l4.5-4.5"/><path d="M4.5 15v4A1.5 1.5 0 0 0 6 20.5h12a1.5 1.5 0 0 0 1.5-1.5v-4"/>'
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

function renderProjectBody(raw) {
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
  return [...parsed.body.firstElementChild.childNodes].map(copy);
}

const TAB_ICONS = {
  overview: '<path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4M9 12h7M9 16h5"/>',
  gallery: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="m21 16-5-5-8 8"/>',
  changelog: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  versions: '<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9z"/><path d="m4 7.5 8 4.5 8-4.5M12 12v9"/>'
};
const tabIcon = (name) => `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${TAB_ICONS[name]}</svg>`;
function buildProjectTabs(detail) {
  const tabs = document.createElement('nav'); tabs.className = 'mist-project-tabs';
  tabs.innerHTML = ['overview', 'gallery', 'changelog', 'versions'].map((name, index) => `<button type="button"${index ? '' : ' class="is-active"'} data-project-tab="${name}">${tabIcon(name)}<span>${name[0].toUpperCase() + name.slice(1)}</span></button>`).join('');
  tabs.addEventListener('click', (event) => {
    const button = event.target.closest('[data-project-tab]'); if (!button) return;
    const name = button.dataset.projectTab;
    tabs.querySelectorAll('button').forEach((entry) => entry.classList.toggle('is-active', entry === button));
    detail.classList.toggle('mist-gallery-view', name === 'gallery');
    detail.classList.toggle('mist-changelog-view', name === 'changelog');
    detail.classList.toggle('mist-versions-view', name === 'versions');
  });
  return tabs;
}

function syncProjectDetails() {
  document.querySelectorAll('.project-detail').forEach((detail) => {
    const body = detail.querySelector('.project-body');
    if (body && body.dataset.mistOriginal !== body.textContent) {
      const raw = body.textContent.trim(); body.dataset.mistOriginal = raw;
      body.replaceChildren(...renderProjectBody(raw)); body.dataset.mistDisplay = body.textContent;
    }
    if (body && body.dataset.mistDisplay === body.textContent) body.dataset.mistOriginal = body.dataset.mistDisplay;
    if (!detail.dataset.mistTabs) {
      const head = detail.querySelector('.project-detail-head');
      if (!head) return;
      detail.dataset.mistTabs = '1';
      const modalBody=detail.closest('.modal-body'); if(modalBody) modalBody.scrollTop=0;
      head.after(buildProjectTabs(detail));
      detail.querySelectorAll('.field').forEach((field)=>{if (/^pack version$/i.test(field.querySelector('label')?.textContent?.trim()||'')) field.classList.add('mist-pack-version-source');});
      detail.querySelectorAll('.install-box .field').forEach((field)=>{if(/^install to$/i.test(field.querySelector('label')?.textContent?.trim()||''))field.classList.add('mist-install-target-field');});
      detail.querySelectorAll('.changelog').forEach((item)=>item.classList.add('mist-version-changelog-source'));
      let gallery = detail.querySelector('.gallery');
      if (!gallery) { gallery = document.createElement('div'); gallery.className = 'gallery'; const tab = detail.querySelector('.mist-project-tabs'); if (tab) tab.after(gallery); else detail.appendChild(gallery); }
      if (gallery.dataset.mistBuilt !== '1') {
        gallery.dataset.mistBuilt = '1';
        let galleryData=[]; try { galleryData=JSON.parse(detail.querySelector('.mist-gallery-data')?.textContent||'[]'); } catch {}
        galleryData.forEach((image)=>{if(!/^https:\/\//i.test(image.url||'')||[...gallery.querySelectorAll('img')].some((entry)=>entry.src===image.url))return;const img=document.createElement('img');img.src=image.url;img.alt=image.title||image.description||'';img.loading='lazy';gallery.appendChild(img);});
        if (!gallery.querySelector('img')) { const empty=document.createElement('p'); empty.className='mist-content-state'; empty.textContent='No gallery images were provided for this project.'; gallery.appendChild(empty); }
      }
      let changelog=detail.querySelector('.mist-project-changelog');
      if(!changelog){changelog=document.createElement('section');changelog.className='mist-project-changelog';changelog.setAttribute('aria-label','Project changelog');const tab=detail.querySelector('.mist-project-tabs');if(tab)tab.after(changelog);else detail.appendChild(changelog);}
      let versions = detail.querySelector('.mist-version-browser');
      if (!versions) {
        versions = document.createElement('section'); versions.className='mist-version-browser';
        versions.innerHTML=VERSION_BROWSER_HTML;
        const tab=detail.querySelector('.mist-project-tabs'); if(tab) tab.after(versions); else detail.appendChild(versions);
      }
    }
    enhancePackDetail(detail);
    renderProjectVersions(detail);
  });
}

const R10_REMOTE_PROJECTS = [
  {
    "id": "CwaddKq6",
    "slug": "faithless",
    "title": "Faithless",
    "type": "resourcepack",
    "icon": "https://cdn.modrinth.com/data/CwaddKq6/1c73dfdd7fab5a1f61bce86207340d5231320ed8_96.webp",
    "description": "Faithful to vanilla, yet a complete overhaul! - Building, Redstone, Survival, PvP... All in one.",
    "categories": [
      "16x",
      "gui",
      "modded"
    ],
    "client": "required",
    "server": "unsupported"
  },
  {
    "id": "CTAstxQN",
    "slug": "visual-enchantments",
    "title": "Visual Enchantments",
    "type": "resourcepack",
    "icon": "https://cdn.modrinth.com/data/CTAstxQN/6222ee4ca6639feea3c7cdaf69c0df5442f5840d.png",
    "description": "A resourcepack that adds visual indicators to enchanted items",
    "categories": [
      "items",
      "tweaks",
      "utility"
    ],
    "client": "required",
    "server": "unsupported"
  },
  {
    "id": "WX4iF5Cj",
    "slug": "potato-shaders",
    "title": "Potato Shaders",
    "type": "shader",
    "icon": "https://cdn.modrinth.com/data/WX4iF5Cj/9debf0377e80ac9bb34bdefab6cf77272c1a6830_96.webp",
    "description": "A very lightweight shaderpack that is still fancy in its own way.",
    "categories": [
      "bloom",
      "fantasy",
      "potato"
    ],
    "client": "required",
    "server": "unsupported"
  },
  {
    "id": "Q1vvjJYV",
    "slug": "bsl-shaders",
    "title": "BSL Shaders",
    "type": "shader",
    "icon": "https://cdn.modrinth.com/data/Q1vvjJYV/2a611a3cb434fb52fb81fa5dace13c5d8b67e55d_96.webp",
    "description": "Shaderpack for Minecraft: Java Edition. It's bright, colorful, and distinct.",
    "categories": [
      "bloom",
      "cartoon",
      "low"
    ],
    "client": "required",
    "server": "unsupported"
  },
  {
    "id": "A8aBf1Xa",
    "slug": "rotrblocks",
    "title": "rotrBLOCKS",
    "type": "resourcepack",
    "icon": "https://cdn.modrinth.com/data/A8aBf1Xa/ca4c5d6b0c45ecb54e19087361cec272f1dd5146_96.webp",
    "description": "A pbr/pom resource pack that won't take away your vanilla style, but will make it so much better!",
    "categories": [
      "128x",
      "realistic",
      "vanilla-like"
    ],
    "client": "required",
    "server": "unsupported"
  },
  {
    "id": "HVnmMxH1",
    "slug": "complementary-reimagined",
    "title": "Complementary Shaders - Reimagined",
    "type": "shader",
    "icon": "https://cdn.modrinth.com/data/HVnmMxH1/79cb7c8123bbc54945305b2ebad6b8881efdf5f8_96.webp",
    "description": "Preserving the elements of Minecraft with exceptional quality, detail, and performance.",
    "categories": [
      "colored-lighting",
      "vanilla-like"
    ],
    "client": "required",
    "server": "unsupported"
  },
  {
    "id": "LBcosBrl",
    "slug": "bettervanillabuilding",
    "title": "BetterVanillaBuilding",
    "type": "resourcepack",
    "icon": "https://cdn.modrinth.com/data/LBcosBrl/icon.png",
    "description": "The BetterVanillaBuilding pack contains new textures for a large range of default Minecraft blocks and items.",
    "categories": [
      "16x",
      "blocks",
      "items"
    ],
    "client": "required",
    "server": "unsupported"
  },
  {
    "id": "ZpBKASR2",
    "slug": "xalis-enchanted-books",
    "title": "xali's Enchanted Books",
    "type": "resourcepack",
    "icon": "https://cdn.modrinth.com/data/ZpBKASR2/6c2d9ce61b9356e67ec6decdad8e828e77718132.png",
    "description": "A small CIT that attribute custom textures to enchanted books to be more identifiable.",
    "categories": [
      "items",
      "themed",
      "vanilla-like"
    ],
    "client": "required",
    "server": "unsupported"
  },
  {
    "id": "5aPp18Lx",
    "slug": "3d-default",
    "title": "3D Default",
    "type": "resourcepack",
    "icon": "https://cdn.modrinth.com/data/5aPp18Lx/7e1ed27dcd696bf94e069344e66b6b9dd833b2ef.png",
    "description": "A light-weight resource pack mainly provide vanilla-look 3D models",
    "categories": [
      "blocks",
      "models",
      "vanilla-like"
    ],
    "client": "required",
    "server": "unsupported"
  },
  {
    "id": "2YyNMled",
    "slug": "dramatic-skys",
    "title": "Dramatic Skys",
    "type": "resourcepack",
    "icon": "https://cdn.modrinth.com/data/2YyNMled/75af81c8e31ad9b2848bff6fc40c9d7232f3c3b0_96.webp",
    "description": "Dramatic Skys is an add on pack that will make the skies in your game HD with realistic clouds and lighting. This pack works with any other resource pack, just simply add it over any other pack on the selection screen!",
    "categories": [
      "environment",
      "realistic",
      "tweaks"
    ],
    "client": "required",
    "server": "unsupported"
  },
  {
    "id": "uvpymuxq",
    "slug": "better-leaves",
    "title": "Motschen's Better Leaves",
    "type": "resourcepack",
    "icon": "https://cdn.modrinth.com/data/uvpymuxq/fe1a61998ae57dc6ad1a4bb028334c3c3925d22f_96.webp",
    "description": "Improves the appearance of leaves with high mod compatibility and performance!",
    "categories": [
      "models",
      "realistic",
      "vanilla-like"
    ],
    "client": "required",
    "server": "unsupported"
  },
  {
    "id": "R6NEzAwj",
    "slug": "complementary-unbound",
    "title": "Complementary Shaders - Unbound",
    "type": "shader",
    "icon": "https://cdn.modrinth.com/data/R6NEzAwj/c85ce4049aac76360d2cd24fd9a7003de01ef312_96.webp",
    "description": "Transforming the visuals of Minecraft with exceptional quality, detail, and performance.",
    "categories": [
      "colored-lighting",
      "fantasy"
    ],
    "client": "required",
    "server": "unsupported"
  },
  {
    "id": "LMIZZNxZ",
    "slug": "super-duper-vanilla",
    "title": "Super Duper Vanilla",
    "type": "shader",
    "icon": "https://cdn.modrinth.com/data/LMIZZNxZ/5d09a380b6da014dcbca683879cdfb4a94603cf8_96.webp",
    "description": "A shader pack created to convey the style of the cancelled Super Duper Graphics Pack and other popular Minecraft titles.",
    "categories": [
      "low",
      "pbr",
      "vanilla-like"
    ],
    "client": "required",
    "server": "unsupported"
  },
  {
    "id": "6SLU7tS5",
    "slug": "default-dark-mode",
    "title": "Default Dark Mode",
    "type": "resourcepack",
    "icon": "https://cdn.modrinth.com/data/6SLU7tS5/f90001e4ebed860e7ae913f34c85d745f516a89b.png",
    "description": "🌙 The Dark Mode Resource Pack for Minecraft: Java Edition",
    "categories": [
      "gui",
      "modded",
      "vanilla-like"
    ],
    "client": "required",
    "server": "unsupported"
  },
  {
    "id": "50dA9Sha",
    "slug": "fresh-animations",
    "title": "Fresh Animations",
    "type": "resourcepack",
    "icon": "https://cdn.modrinth.com/data/50dA9Sha/3132c10e9e3c73fde9799720fd3da5561071708c_96.webp",
    "description": "Make your game like the trailers! Dynamic animated entities to freshen your Minecraft experience.",
    "categories": [
      "entities",
      "tweaks",
      "vanilla-like"
    ],
    "client": "required",
    "server": "unsupported"
  },
  {
    "id": "z8EjLYqN",
    "slug": "sildurs-vibrant-shaders",
    "title": "Sildur's Vibrant Shaders",
    "type": "shader",
    "icon": "https://cdn.modrinth.com/data/z8EjLYqN/ced1ec11046d063d8ff681769061db8f5a29134f_96.webp",
    "description": "Very optimized shaderpack for MC: Java edition, around since 2012!\nRuns on any hardware and supports every MC version since 1.7.10.",
    "categories": [
      "atmosphere",
      "fantasy",
      "semi-realistic"
    ],
    "client": "required",
    "server": "unsupported"
  },
  {
    "id": "w0TnApzs",
    "slug": "faithful-32x",
    "title": "Faithful 32x",
    "type": "resourcepack",
    "icon": "https://cdn.modrinth.com/data/w0TnApzs/e8403d1fb2f55321ae74402c1e8c90a3a5670856.png",
    "description": "The original Minecraft texture feel, with double the resolution and double the fun!",
    "categories": [
      "32x",
      "vanilla-like"
    ],
    "client": "required",
    "server": "unsupported"
  },
  {
    "id": "kmwfVOoi",
    "slug": "rethinking-voxels",
    "title": "Rethinking Voxels",
    "type": "shader",
    "icon": "https://cdn.modrinth.com/data/kmwfVOoi/fc89eadad417dd376b14c3b31e1a2b87acaca034_96.webp",
    "description": "[WIP] A gameplay shaderpack based on complementary reimagined that has coloured block light with sharp shadows",
    "categories": [
      "colored-lighting",
      "shadows"
    ],
    "client": "required",
    "server": "unsupported"
  },
  {
    "id": "rox3U8B6",
    "slug": "bare-bones",
    "title": "Bare Bones",
    "type": "resourcepack",
    "icon": "https://cdn.modrinth.com/data/rox3U8B6/b502bd8b2a6048f635230da8e8a66eeb4383874b_96.webp",
    "description": "Minecraft with the style of the trailers",
    "categories": [
      "16x",
      "simplistic",
      "vanilla-like"
    ],
    "client": "required",
    "server": "unsupported"
  },
  {
    "id": "TcEKIE6a",
    "slug": "fresh-gui",
    "title": "Fresh Gui",
    "type": "resourcepack",
    "icon": "https://cdn.modrinth.com/data/TcEKIE6a/8b8fabca7762554f19a94ab865009e4ab8fe7607.png",
    "description": "Prettier GUI and HUD textures!!",
    "categories": [
      "gui",
      "modded",
      "vanilla-like"
    ],
    "client": "required",
    "server": "unsupported"
  },
  {
    "id": "HXF82T3G",
    "slug": "biomes-o-plenty",
    "title": "Biomes O' Plenty",
    "type": "mod",
    "icon": "https://cdn.modrinth.com/data/HXF82T3G/ffb870e12c325b795d54833f8f899126553ef06f.png",
    "description": "Adds 50+ unique biomes to enhance your world, with new trees, flowers, and more!",
    "categories": [
      "adventure",
      "decoration",
      "worldgen"
    ],
    "client": "required",
    "server": "required"
  },
  {
    "id": "2gvRmQXx",
    "slug": "radium",
    "title": "Radium",
    "type": "mod",
    "icon": "https://cdn.modrinth.com/data/2gvRmQXx/e5a1a0496ad3cf36b951348fa1d6fb0511c2ec96_96.webp",
    "description": "Radium is an Unofficial Fork of CaffeineMC's \"Lithium\", made to work with Forge Mod Loader.",
    "categories": [
      "optimization"
    ],
    "client": "unsupported",
    "server": "required"
  },
  {
    "id": "Tkikq67H",
    "slug": "regions-unexplored",
    "title": "Regions Unexplored",
    "type": "mod",
    "icon": "https://cdn.modrinth.com/data/Tkikq67H/e1e85f8a91f09154c2e822fd9a15e167c0230a31_96.webp",
    "description": "A stack of new biomes spread across the Overworld and Nether!",
    "categories": [
      "worldgen"
    ],
    "client": "required",
    "server": "required"
  },
  {
    "id": "P0Mu4wcQ",
    "slug": "artifacts",
    "title": "Artifacts",
    "type": "mod",
    "icon": "https://cdn.modrinth.com/data/P0Mu4wcQ/icon.png",
    "description": "Adds various treasure items that can be found through exploration",
    "categories": [
      "adventure",
      "worldgen"
    ],
    "client": "required",
    "server": "required"
  },
  {
    "id": "o1C1Dkj5",
    "slug": "yungs-better-dungeons",
    "title": "YUNG's Better Dungeons",
    "type": "mod",
    "icon": "https://cdn.modrinth.com/data/o1C1Dkj5/9b54b2d932a5a5b6565c93814935c04902f3179b_96.webp",
    "description": "A complete redesign of Minecraft's dungeons!",
    "categories": [
      "adventure",
      "decoration",
      "worldgen"
    ],
    "client": "unsupported",
    "server": "required"
  },
  {
    "id": "R2OftAxM",
    "slug": "farmers-delight",
    "title": "Farmer's Delight",
    "type": "mod",
    "icon": "https://cdn.modrinth.com/data/R2OftAxM/8e7aa38ab94d94bb0a2894a218b69beb49002b34.png",
    "description": "A cozy expansion to farming and cooking!",
    "categories": [
      "decoration",
      "equipment",
      "food"
    ],
    "client": "required",
    "server": "required"
  },
  {
    "id": "sk9rgfiA",
    "slug": "embeddium",
    "title": "Embeddium",
    "type": "mod",
    "icon": "https://cdn.modrinth.com/data/sk9rgfiA/55f9c50284f8abbbe2a485abfd6a16209201e451_96.webp",
    "description": "A powerful, mod-friendly, FOSS client performance mod for NeoForge",
    "categories": [
      "optimization"
    ],
    "client": "required",
    "server": "unsupported"
  },
  {
    "id": "HjmxVlSr",
    "slug": "yungs-better-mineshafts",
    "title": "YUNG's Better Mineshafts",
    "type": "mod",
    "icon": "https://cdn.modrinth.com/data/HjmxVlSr/4e41ef8344db48b8368cd3d6f35844c8a619f446_96.webp",
    "description": "A long-awaited and much-needed abandoned mineshaft overhaul!",
    "categories": [
      "adventure",
      "decoration",
      "worldgen"
    ],
    "client": "unsupported",
    "server": "required"
  },
  {
    "id": "4I1XuqiY",
    "slug": "entity-model-features",
    "title": "[EMF] Entity Model Features",
    "type": "mod",
    "icon": "https://cdn.modrinth.com/data/4I1XuqiY/6e5bbd0d06b1741bfdab6c0cfab6de8fdaf0064c_96.webp",
    "description": "EMF is an, OptiFine format, Custom Entity Model replacement mod available for Fabric and Forge.",
    "categories": [
      "mobs",
      "utility"
    ],
    "client": "required",
    "server": "unsupported"
  },
  {
    "id": "H1sntfo8",
    "slug": "guard-villagers",
    "title": "Guard Villagers",
    "type": "mod",
    "icon": "https://cdn.modrinth.com/data/H1sntfo8/b95a237f1b05eb3aa8e27b16b756db99d327c37f_96.webp",
    "description": "Village Pest Control",
    "categories": [
      "mobs",
      "utility"
    ],
    "client": "required",
    "server": "required"
  },
  {
    "id": "SaCpeal4",
    "slug": "comforts",
    "title": "Comforts",
    "type": "mod",
    "icon": "https://cdn.modrinth.com/data/SaCpeal4/ed4840f0c9a30e04ad88413bd82cd762dd6ec95d.png",
    "description": "Adds sleeping bags and hammocks for, respectively, portability and turning day to night, without setting new spawns. Comes in 16 different colors!",
    "categories": [
      "adventure",
      "decoration"
    ],
    "client": "required",
    "server": "required"
  },
  {
    "id": "tpehi7ww",
    "slug": "dungeons-and-taverns",
    "title": "Dungeons and Taverns",
    "type": "mod",
    "icon": "https://cdn.modrinth.com/data/tpehi7ww/429ba22d212868940cdd82465df949ac51c9791e_96.webp",
    "description": "A Structure Datapack adding dungeons, taverns and other structures to find while you explore the world.",
    "categories": [
      "adventure",
      "worldgen"
    ],
    "client": "optional",
    "server": "required"
  },
  {
    "id": "fFEIiSDQ",
    "slug": "supplementaries",
    "title": "Supplementaries",
    "type": "mod",
    "icon": "https://cdn.modrinth.com/data/fFEIiSDQ/e9f5f66fa3b67e54acb91258a1428d68311c58bc_96.webp",
    "description": "Vanilla+ additions: Jars, signposts, faucets, weather vanes spring launchers, sconces, planters, lights, decoration and automation",
    "categories": [
      "decoration",
      "game-mechanics",
      "utility"
    ],
    "client": "required",
    "server": "required"
  },
  {
    "id": "BVzZfTc1",
    "slug": "entitytexturefeatures",
    "title": "[ETF] Entity Texture Features",
    "type": "mod",
    "icon": "https://cdn.modrinth.com/data/BVzZfTc1/af683d206d50b05258d865b0d6e4aa2f2cee12f2_96.webp",
    "description": "Emissive, Random & Custom texture support for entities in resourcepacks just like Optifine but for Fabric",
    "categories": [
      "decoration",
      "utility"
    ],
    "client": "required",
    "server": "unsupported"
  },
  {
    "id": "GchcoXML",
    "slug": "oculus",
    "title": "Oculus",
    "type": "mod",
    "icon": "https://cdn.modrinth.com/data/GchcoXML/09ef853cdfd3d467dead4faef37102535a2185d5_96.webp",
    "description": "Unofficial Fork of \"Iris\", made to work with FML",
    "categories": [
      "decoration",
      "optimization"
    ],
    "client": "required",
    "server": "unsupported"
  },
  {
    "id": "8DfbfASn",
    "slug": "when-dungeons-arise",
    "title": "When Dungeons Arise",
    "type": "mod",
    "icon": "https://cdn.modrinth.com/data/8DfbfASn/4240773f6aa5f8c69f44a5e2e0ff313f98ff3389_96.webp",
    "description": "Adds various elegant -and likely hostile- roguelike dungeons and structures that generate on your worlds!",
    "categories": [
      "adventure",
      "worldgen"
    ],
    "client": "unsupported",
    "server": "required"
  }
];
/* ------------------------------------------------------------- pack detail: shared */
Object.assign(ICONS, {
  heart: '<path d="M12 20.5s-7.5-4.6-7.5-10.4A4.1 4.1 0 0 1 12 7.6a4.1 4.1 0 0 1 7.5 2.5c0 5.8-7.5 10.4-7.5 10.4z"/>',
  link: '<path d="M10 13.5a4 4 0 0 0 5.66.34l3-3a4 4 0 0 0-5.66-5.66l-1.2 1.2"/><path d="M14 10.5a4 4 0 0 0-5.66-.34l-3 3a4 4 0 0 0 5.66 5.66l1.2-1.2"/>',
  xLogo: '<path d="M4 4l6.6 8.8L4.3 20H6l5.4-6.1L16 20h4l-6.9-9.2L19 4h-1.7l-5 5.6L8 4z"/>',
  more: '<circle cx="5.5" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="18.5" cy="12" r="1.2"/>',
  external: '<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 14v4.5A1.5 1.5 0 0 1 16.5 20h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10"/>',
  star: '<path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>',
  calendar: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M8 3v4M16 3v4"/>',
  tag: '<path d="M3.5 12.2V4.5a1 1 0 0 1 1-1h7.7l8.3 8.3a1 1 0 0 1 0 1.4l-7.3 7.3a1 1 0 0 1-1.4 0z"/><circle cx="8" cy="8" r="1.4"/>',
  scale: '<path d="M12 4v16M7 20h10M5 8h14M5 8l-2.5 6a3 3 0 0 0 5 0zM19 8l-2.5 6a3 3 0 0 0 5 0z"/>',
  code: '<path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/>',
  bug: '<rect x="7" y="8" width="10" height="12" rx="5"/><path d="M9 8a3 3 0 0 1 6 0M12 12v8M3 13h4M17 13h4M4 7l3 2M20 7l-3 2M4 19l3-2M20 19l-3-2"/>',
  refresh: '<path d="M20 11a8 8 0 0 0-14.6-4.5L4 8"/><path d="M4 4v4h4M4 13a8 8 0 0 0 14.6 4.5L20 16"/><path d="M20 20v-4h-4"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.2a6.5 6.5 0 0 1 3.5 5.8"/>',
  monitor: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  server: '<rect x="4" y="4" width="16" height="7" rx="1.5"/><rect x="4" y="13" width="16" height="7" rx="1.5"/><path d="M8 7.5h.01M8 16.5h.01"/>',
  alert: '<path d="M12 4 2.5 20h19z"/><path d="M12 10v4.5M12 17.5h.01"/>',
  copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5.5A1.5 1.5 0 0 0 14.5 4h-9A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8"/>',
  java: '<path d="M5 9h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5z"/><path d="M16 10h1.5a2.5 2.5 0 0 1 0 5H16M9 3c-1 1 1 2 0 3M12 3c-1 1 1 2 0 3"/>',
  chip: '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>'
});
const pdIcon = (name, size = 16) => svg(name).replace('width="20" height="20"', `width="${size}" height="${size}"`);
const PD_TYPES = {
  modpack: ['Modpack', 'Modpacks', 'modpack'], mod: ['Mod', 'Mods', 'mod'], shader: ['Shader', 'Shaders', 'shaders'],
  resourcepack: ['Resource Pack', 'Resource Packs', 'resource pack'], datapack: ['Data Pack', 'Data Packs', 'data pack']
};
const PD_LOADERS = { fabric: 'Fabric', forge: 'Forge', neoforge: 'NeoForge', quilt: 'Quilt', iris: 'Iris', optifine: 'OptiFine', canvas: 'Canvas', vanilla: 'Vanilla', minecraft: 'Vanilla', datapack: 'Data Pack' };
const PD_MOD_LOADERS = ['fabric', 'forge', 'neoforge', 'quilt'];
const PD_NON_CATEGORY = new Set([...Object.keys(PD_LOADERS), 'liteloader', 'rift', 'modloader', 'bukkit', 'paper', 'spigot', 'folia', 'purpur', 'sponge', 'velocity', 'bungeecord', 'waterfall']);
const PD_STOP = new Set(['the', 'and', 'for', 'with', 'minecraft', 'mod', 'mods', 'pack', 'packs', 'modpack', 'shader', 'shaders', 'resource', 'data', 'edition', 'plus', 'of', 'a', 'an', 'by', 'in', 'on', 'to', 'fabric', 'forge', 'neoforge', 'quilt', 'version']);
const VERSION_BROWSER_HTML = '<div class="mist-version-filters"><select aria-label="Filter by loader"><option value="">Any loader</option></select><select aria-label="Filter by game version"><option value="">Any version</option></select><select aria-label="Filter by channel"><option value="">Any channel</option></select><span class="mist-version-count"></span></div><div class="mist-version-table"><div class="mist-version-table-head"><span>Version</span><span>Channel</span><span>Date</span><span>Game versions</span><span>Action</span></div><div class="mist-version-rows"></div></div>';
let pdPendingModpack = null;

const pdMk = (tag, cls, text) => { const el = document.createElement(tag); if (cls) el.className = cls; if (text != null) el.textContent = text; return el; };
const pdEsc = (value) => String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pdLoaderName = (value) => PD_LOADERS[String(value).toLowerCase()] || String(value).replace(/^./, (c) => c.toUpperCase());
const pdOpen = (url) => { if (/^https:\/\//i.test(url || '')) { try { window.mist.app.openExternal(url); } catch {} } };
const pdCopy = async (text, message) => {
  try { await window.mist.app.copyToClipboard(text); } catch { try { await navigator.clipboard.writeText(text); } catch {} }
  showMistToast(message || 'Copied to clipboard', 'ok');
};
const pdJson = (detail, selector, fallback) => { try { return JSON.parse(detail.querySelector(selector)?.textContent || '') ?? fallback; } catch { return fallback; } };
const pdIsRelease = (value) => /^\d+\.\d+(\.\d+)?$/.test(String(value));
const pdCompareMc = (a, b) => { const pa = String(a).split('.').map(Number), pb = String(b).split('.').map(Number); for (let i = 0; i < 3; i++) { const d = (pa[i] || 0) - (pb[i] || 0); if (d) return d; } return 0; };
const pdMcRange = (versions) => {
  const all = [...new Set((versions || []).flatMap((v) => v.gameVersions || v.game_versions || []))].filter(pdIsRelease).sort(pdCompareMc);
  if (!all.length) return null;
  const min = all[0], max = all[all.length - 1];
  return { min, max, count: all.length, label: min === max ? min : `${min} – ${max}` };
};
const pdDate = (value) => { const d = value ? new Date(value) : null; return d && !Number.isNaN(d.getTime()) ? d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : ''; };
const pdAgo = (value) => {
  const d = value ? new Date(value) : null; if (!d || Number.isNaN(d.getTime())) return '';
  const s = Math.max(1, Math.floor((Date.now() - d.getTime()) / 1000));
  const units = [[31536000, 'year'], [2592000, 'month'], [604800, 'week'], [86400, 'day'], [3600, 'hour'], [60, 'minute']];
  for (const [size, name] of units) { const n = Math.floor(s / size); if (n >= 1) return `${n} ${name}${n > 1 ? 's' : ''} ago`; }
  return 'just now';
};
const pdRouteType = () => {
  const hash = location.hash || '';
  if (/^#\/modpacks/.test(hash)) return 'modpack';
  if (/^#\/mods/.test(hash)) return 'mod';
  if (/^#\/shaders/.test(hash)) return 'shader';
  if (/^#\/resourcepacks/.test(hash)) return 'resourcepack';
  if (/^#\/worlds/.test(hash)) return 'datapack';
  return '';
};
const pdNorm = (value) => String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const pdTokens = (value) => pdNorm(value).split(' ').filter((t) => t.length > 2 && !PD_STOP.has(t));
const pdFavs = () => { try { return JSON.parse(localStorage.getItem('mist-favorite-projects') || '{}') || {}; } catch { return {}; } };
const pdToggleFav = (key, entry) => {
  const favs = pdFavs();
  if (favs[key]) delete favs[key]; else favs[key] = { ...entry, at: Date.now() };
  try { localStorage.setItem('mist-favorite-projects', JSON.stringify(favs)); } catch {}
  return Boolean(favs[key]);
};
const pdVideoCache = new Map();
const pdVideos = (query, limit) => {
  if (!pdVideoCache.has(query)) pdVideoCache.set(query, Promise.resolve(window.mist.videos.search(query, limit)).catch((error) => { pdVideoCache.delete(query); throw error; }));
  return pdVideoCache.get(query);
};
const pdExtrasCache = new Map();
function modrinthExtras(project) {
  const id = project && (project.id || project.slug);
  if (!id || (project.source && project.source !== 'modrinth')) return Promise.resolve(null);
  if (!pdExtrasCache.has(id)) {
    const base = `https://api.modrinth.com/v2/project/${encodeURIComponent(id)}`;
    pdExtrasCache.set(id, Promise.all([
      fetch(base).then((r) => (r.ok ? r.json() : null)),
      fetch(`${base}/members`).then((r) => (r.ok ? r.json() : [])).catch(() => [])
    ]).then(([p, members]) => {
      if (!p) return null;
      const owner = (members || []).find((m) => /owner/i.test(m.role || '')) || (members || [])[0];
      const gallery = p.gallery || [];
      return {
        description: p.description || '', followers: p.followers || 0, published: p.published, updated: p.updated,
        sourceUrl: p.source_url, issuesUrl: p.issues_url, wikiUrl: p.wiki_url, discordUrl: p.discord_url,
        donationUrl: (p.donation_urls || [])[0]?.url || '', banner: (gallery.find((g) => g.featured) || gallery[0] || {}).url || '',
        clientSide: p.client_side, serverSide: p.server_side, gameVersions: p.game_versions || [], loaders: p.loaders || [],
        categories: [...(p.categories || []), ...(p.additional_categories || [])],
        color: typeof p.color === 'number' ? `#${p.color.toString(16).padStart(6, '0')}` : '',
        ownerName: owner?.user?.username || '', ownerAvatar: owner?.user?.avatar_url || '',
        license: p.license?.name || p.license?.id || ''
      };
    }).catch(() => { pdExtrasCache.delete(id); return null; }));
  }
  return pdExtrasCache.get(id);
}
let pdInstCache = null;
function pdInstallations(force) {
  if (force || !pdInstCache || Date.now() - pdInstCache.at > 10000) {
    const cache = { at: Date.now(), list: pdInstCache?.list || null };
    cache.promise = Promise.resolve(window.mist.installations.list()).then((list) => { cache.list = list || []; return cache.list; }).catch(() => []);
    pdInstCache = cache;
  }
  return pdInstCache.promise;
}
function pdInstallArt(inst, cls) {
  const art = pdMk('span', cls);
  const icon = String(inst.icon || '');
  const letter = () => mistDecorateGen(art, inst);
  const image = (src) => { const img = pdMk('img'); img.src = src; img.alt = ''; img.onerror = letter; art.appendChild(img); };
  if (icon.startsWith('url:')) { image(icon.slice(4)); return art; }
  if (icon.startsWith('custom:')) {
    Promise.resolve(window.mist.installations.iconData(inst.id)).then((url) => (url ? image(url) : letter())).catch(letter);
    return art;
  }
  return mistDecorateGen(art, inst);
}
function pdFillIcon(host, url, title) {
  if (host.dataset.src === (url || '') && host.firstChild) return;
  host.dataset.src = url || '';
  if (url) { const img = pdMk('img'); img.src = url; img.alt = ''; host.replaceChildren(img); }
  else host.replaceChildren(pdMk('span', 'mist-pd-letter', (title || '?').slice(0, 1).toUpperCase()));
}
const pdBody = (detail) => detail.querySelector(':scope > .project-body, :scope > .mist-pd-body');
const pdScroller = (detail) => detail.closest('.mist-pd-scroll') || detail.closest('.modal-body');
function pdVersions(detail) {
  if (detail._mistRemoteVersions) return detail._mistRemoteVersions;
  const text = detail.querySelector('.mist-version-data')?.textContent || '[]';
  if (detail._mistVersionText !== text) { detail._mistVersionText = text; try { detail._mistVersionList = JSON.parse(text) || []; } catch { detail._mistVersionList = []; } }
  return detail._mistVersionList || [];
}
function pdContext(detail) {
  const standalone = detail.classList.contains('mist-pd-standalone');
  const project = detail._mistProjectData || pdJson(detail, '.mist-project-data', {}) || {};
  const type = detail._mistType || (PD_TYPES[project.projectType] ? project.projectType : '') || pdRouteType() || 'mod';
  const iconUrl = detail._mistIconUrl || detail.querySelector('.project-detail-head .project-icon img')?.src || project.iconUrl || '';
  const gallery = detail._mistGalleryData || pdJson(detail, '.mist-gallery-data', []) || [];
  if (!project.title) project.title = detail.querySelector('.project-detail-head :is(h1,h2,h3)')?.textContent?.trim() || '';
  return { project, type, info: PD_TYPES[type] || PD_TYPES.mod, iconUrl, gallery, standalone, key: `${project.source || 'x'}:${project.id || project.slug || project.title}` };
}
function pdNativeVersionSelect(detail, versions) {
  const ids = new Set(versions.map((v) => String(v.id)));
  return [...detail.querySelectorAll('select')].find((s) => !s.closest('.mist-pd-own, .mist-version-browser') && [...s.options].some((o) => ids.has(o.value))) || null;
}
function pdSetNative(select, value) {
  const setter = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value')?.set;
  if (setter) setter.call(select, value); else select.value = value;
  select.dispatchEvent(new Event('input', { bubbles: true }));
  select.dispatchEvent(new Event('change', { bubbles: true }));
}
function pdClose(detail) {
  if (detail.classList.contains('mist-pd-standalone')) { closeStandaloneProject(); return; }
  detail.closest('.overlay')?.querySelector('.modal-close')?.click();
}
const pdProjectUrl = (project) => {
  if (/^https:\/\//i.test(project.externalUrl || '')) return project.externalUrl;
  if ((project.source || 'modrinth') === 'modrinth' && (project.slug || project.id)) return `https://modrinth.com/project/${encodeURIComponent(project.slug || project.id)}`;
  return '';
};
function showMistToast(message, tone) {
  let toast = document.getElementById('mist-dp-toast');
  if (!toast) { toast = pdMk('div'); toast.id = 'mist-dp-toast'; toast.setAttribute('role', 'status'); document.body.appendChild(toast); }
  toast.textContent = message;
  toast.className = `is-visible${tone ? ` is-${tone}` : ''}`;
  clearTimeout(toast._mistTimer);
  toast._mistTimer = setTimeout(() => toast.classList.remove('is-visible'), 3400);
}
function showDatapackToast(message) { showMistToast(message); }

/* ------------------------------------------------------------- versions + changelog tabs */
function paintProjectVersions(detail, data) {
  const browser = detail.querySelector('.mist-version-browser'); if (!browser) return;
  const filters = [...browser.querySelectorAll('.mist-version-filters select')], rows = browser.querySelector('.mist-version-rows');
  if (filters.length !== 3 || !rows) return;
  const versions = data.filter((item) => item && (item.id || item.versionNumber || item.name));
  const unique = (values) => [...new Set(values.filter(Boolean).map(String))];
  const loadersOf = (item) => (item.loaders || item.game_loaders || []).map((v) => String(v).toLowerCase());
  const gamesOf = (item) => item.gameVersions || item.game_versions || [];
  const channelOf = (item) => String(item.releaseType || item.versionType || item.version_type || 'release').toLowerCase();
  const loaders = unique(versions.flatMap(loadersOf));
  const games = unique(versions.flatMap(gamesOf)).sort((a, b) => (pdIsRelease(a) && pdIsRelease(b) ? pdCompareMc(b, a) : pdIsRelease(a) ? -1 : pdIsRelease(b) ? 1 : 0));
  const channels = unique(versions.map(channelOf));
  const optSig = [loaders, games, channels].map((list) => list.join(',')).join('|');
  if (browser._mistOptSig !== optSig) {
    browser._mistOptSig = optSig;
    const selected = filters.map((f) => f.value);
    filters[0].replaceChildren(new Option('Any loader', ''), ...loaders.map((v) => new Option(pdLoaderName(v), v)));
    filters[1].replaceChildren(new Option('Any version', ''), ...games.map((v) => new Option(v, v)));
    filters[2].replaceChildren(new Option('Any channel', ''), ...channels.map((v) => new Option(v[0].toUpperCase() + v.slice(1), v)));
    filters.forEach((f, i) => { if ([...f.options].some((o) => o.value === selected[i])) f.value = selected[i]; });
  }
  const matches = versions.filter((item) => (!filters[0].value || loadersOf(item).includes(filters[0].value)) && (!filters[1].value || gamesOf(item).includes(filters[1].value)) && (!filters[2].value || channelOf(item) === filters[2].value));
  browser.querySelector('.mist-version-count').textContent = `${matches.length} version${matches.length === 1 ? '' : 's'}`;
  if (!matches.length) {
    rows.replaceChildren(pdMk('p', 'mist-content-state', detail._mistLoading ? 'Loading versions…' : versions.length ? 'No versions match these filters.' : 'No versions were published for this project.'));
    return;
  }
  const shown = matches.slice(0, 150);
  rows.replaceChildren(...shown.map((item) => {
    const row = pdMk('div', 'mist-version-row');
    const channel = channelOf(item);
    const gameList = gamesOf(item);
    const game = pdMk('span', '', gameList.length > 6 ? `${gameList.slice(0, 6).join(', ')} +${gameList.length - 6}` : gameList.join(', ') || '—');
    game.title = gameList.join(', ');
    const action = pdMk('button', 'mist-version-install', 'Install'); action.type = 'button';
    action.addEventListener('click', () => detail.mistOpenInstall?.(item.id));
    row.append(pdMk('strong', '', item.versionNumber || item.version_number || item.name || item.fileName || 'Unnamed version'),
      pdMk('span', `mist-version-release is-${channel}`, channel[0].toUpperCase() + channel.slice(1)),
      pdMk('span', '', pdDate(item.publishedAt || item.datePublished || item.date_published) || '—'), game, action);
    return row;
  }));
  if (matches.length > shown.length) rows.appendChild(pdMk('p', 'mist-content-state', `Showing ${shown.length} of ${matches.length} versions. Use the filters to narrow the list.`));
}

function paintProjectChangelog(detail, data) {
  const panel = detail.querySelector('.mist-project-changelog'); if (!panel) return;
  const entries = data.filter((item) => item && (item.changelog || item.body || item.versionNotes || item.notes)).slice(0, 40);
  if (!entries.length) { panel.replaceChildren(pdMk('p', 'mist-content-state', detail._mistLoading ? 'Loading changelog…' : 'No changelog entries were provided for this project.')); return; }
  panel.replaceChildren(...entries.map((item) => {
    const entry = pdMk('article', 'mist-changelog-entry');
    const heading = pdMk('header');
    const channel = String(item.releaseType || item.versionType || item.version_type || '');
    heading.append(pdMk('strong', '', item.versionNumber || item.version_number || item.name || 'Version update'),
      pdMk('span', '', [channel, pdDate(item.publishedAt || item.datePublished || item.date_published), (item.gameVersions || item.game_versions || []).slice(0, 6).join(', ')].filter(Boolean).join(' · ')));
    const content = pdMk('div', 'mist-changelog-copy');
    try { content.replaceChildren(...renderProjectBody(String(item.changelog || item.body || item.versionNotes || item.notes))); }
    catch { content.textContent = String(item.changelog || item.body || ''); }
    entry.append(heading, content);
    return entry;
  }));
}

function renderProjectVersions(detail) {
  const browser = detail.querySelector('.mist-version-browser'); if (!browser) return;
  if (!browser._mistWired) { browser._mistWired = true; browser.addEventListener('change', () => { browser._mistSig = ''; renderProjectVersions(detail); }); }
  const data = pdVersions(detail);
  const filters = [...browser.querySelectorAll('.mist-version-filters select')].map((s) => s.value).join(',');
  const sig = `${data.length}|${data[0]?.id || ''}|${filters}|${detail._mistLoading ? 1 : 0}`;
  if (browser._mistSig === sig) return;
  browser._mistSig = sig;
  paintProjectVersions(detail, data);
  paintProjectChangelog(detail, data);
}


/* ------------------------------------------------------------- pack detail: page */
const PD_FEATURE_ICONS = ['sparkle', 'star', 'routeMods', 'world', 'gear', 'pack'];
function enhancePackDetail(detail) {
  const ctx = pdContext(detail);
  let st = detail._mistPd;
  if (st && st.key !== ctx.key) { pdTeardown(detail); st = null; }
  if (!st) st = pdBuild(detail, ctx);
  st.ctx = ctx;
  const versions = pdVersions(detail);
  const sig = `${versions.length}|${versions[0]?.id || ''}|${ctx.iconUrl}|${detail._mistLoading ? 1 : 0}|${st.extras ? 1 : 0}|${ctx.project.title}`;
  if (st.sig !== sig) { st.sig = sig; pdRefresh(detail, st); }
  pdSyncNativeVersion(detail, st);
  pdSyncBody(detail, st);
  pdEnsurePlacement(detail, st);
}
function pdTeardown(detail) {
  const st = detail._mistPd; if (!st) return;
  st.io?.disconnect();
  detail.querySelectorAll('.mist-pd-own').forEach((el) => el.remove());
  detail.classList.remove('mist-pd-clamp', 'mist-pd-expanded');
  detail._mistPd = null;
}
function pdBuild(detail, ctx) {
  detail.classList.add('mist-pd');
  const st = { key: ctx.key, ctx, extras: null };
  detail._mistPd = st;
  const own = (el) => { el.classList.add('mist-pd-own'); return el; };
  st.hero = own(pdMk('section', 'mist-pd-hero'));
  st.hero.innerHTML = `<div class="mist-pd-hero-bg"></div><div class="mist-pd-hero-shade"></div>
<div class="mist-pd-hero-top"><button type="button" class="mist-pd-iconbtn" data-pd="close" aria-label="Back">${pdIcon('back', 18)}</button><nav class="mist-pd-crumbs" aria-label="Breadcrumb"><span></span>${pdIcon('chevronRight', 14)}<strong></strong></nav><button type="button" class="mist-pd-iconbtn" data-pd="close" aria-label="Close">${pdIcon('close', 18)}</button></div>
<div class="mist-pd-hero-main"><div class="mist-pd-hero-icon"></div><div class="mist-pd-hero-copy"><div class="mist-pd-chips"></div><h1></h1><p class="mist-pd-by"></p><div class="mist-pd-stats"></div><p class="mist-pd-tagline"></p>
<div class="mist-pd-actions"><label class="mist-pd-version"><span>Version</span><select aria-label="Version to install"></select></label><button type="button" class="mist-pd-install">${pdIcon('download', 18)}<span>Install</span></button><button type="button" class="mist-pd-fav">${pdIcon('heart', 17)}<span>Add to Favorites</span></button><button type="button" class="mist-pd-iconbtn mist-pd-web" aria-label="Open project page" title="Open project page">${pdIcon('external', 17)}</button></div></div></div>`;
  st.hero.querySelectorAll('[data-pd="close"]').forEach((b) => b.addEventListener('click', () => pdClose(detail)));
  st.hero.querySelector('.mist-pd-install').addEventListener('click', () => pdInstall(detail, st));
  st.hero.querySelector('.mist-pd-web').addEventListener('click', () => pdOpen(pdProjectUrl(st.ctx.project)));
  st.hero.querySelector('.mist-pd-version select').addEventListener('change', (event) => {
    if (st.ctx.standalone) return;
    const native = pdNativeVersionSelect(detail, pdVersions(detail));
    if (native && event.target.value) { pdSetNative(native, event.target.value); st.nativeSeen = event.target.value; }
  });
  st.hero.querySelector('.mist-pd-fav').addEventListener('click', () => {
    const { project, type, iconUrl, key } = st.ctx;
    const on = pdToggleFav(key, { id: project.id, source: project.source, title: project.title, type, iconUrl });
    pdPaintFav(st); showMistToast(on ? `Added ${project.title} to favorites` : `Removed ${project.title} from favorites`, on ? 'ok' : '');
  });

  st.side = own(pdMk('aside', 'mist-pd-side'));
  st.side.innerHTML = `<section class="mist-pd-card mist-pd-info"><h3>${pdIcon('info', 16)}<span>Information</span></h3><div class="mist-pd-author"></div><dl class="mist-pd-facts"></dl><div class="mist-pd-links"></div></section>
<section class="mist-pd-card mist-pd-share"><h3>${pdIcon('link', 16)}<span>Share</span></h3><div class="mist-pd-share-url"><input readonly aria-label="Project link"><button type="button" data-share="link" aria-label="Copy link">${pdIcon('copy', 15)}</button></div><div class="mist-pd-share-row"><button type="button" data-share="link">${pdIcon('link', 17)}<span>Link</span></button><button type="button" data-share="discord">${pdIcon('discord', 17)}<span>Discord</span></button><button type="button" data-share="x">${pdIcon('xLogo', 17)}<span>X</span></button><button type="button" data-share="more">${pdIcon('more', 17)}<span>More</span></button></div></section>
<section class="mist-pd-card mist-pd-related"><header><h3>${pdIcon('star', 16)}<span></span></h3><button type="button" class="mist-pd-small-btn" aria-label="Show other packs" title="Show other packs">${pdIcon('refresh', 15)}</button></header><div class="mist-pd-related-list"></div><button type="button" class="mist-pd-related-all">Browse all</button></section>`;
  st.side.querySelectorAll('[data-share]').forEach((button) => button.addEventListener('click', () => {
    const { project } = st.ctx; const url = pdProjectUrl(project); const author = st.extras?.ownerName || project.author || '';
    if (!url) { showMistToast('This project has no public page to share.', 'warn'); return; }
    const kind = button.dataset.share;
    if (kind === 'link') pdCopy(url, 'Link copied');
    else if (kind === 'discord') pdCopy(`**${project.title}**${author ? ` by ${author}` : ''}\n<${url}>`, 'Copied — paste it in Discord');
    else if (kind === 'x') pdOpen(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out ${project.title} for Minecraft`)}&url=${encodeURIComponent(url)}`);
    else pdOpen(url);
  }));
  st.side.querySelector('.mist-pd-related .mist-pd-small-btn').addEventListener('click', () => { st.relatedPage = (st.relatedPage || 0) + 1; pdPaintRelated(detail, st); });
  st.side.querySelector('.mist-pd-related-all').addEventListener('click', () => pdClose(detail));

  st.aboutHead = own(pdMk('div', 'mist-pd-about-head'));
  st.aboutHead.innerHTML = `<h2>About</h2>`;
  st.readMore = own(pdMk('button', 'mist-pd-readmore', 'Read more')); st.readMore.type = 'button'; st.readMore.hidden = true;
  st.readMore.addEventListener('click', () => {
    const open = !detail.classList.contains('mist-pd-expanded');
    detail.classList.toggle('mist-pd-expanded', open);
    st.readMore.textContent = open ? 'Show less' : 'Read more';
    if (!open) st.aboutHead.scrollIntoView({ block: 'start' });
  });
  st.features = own(pdMk('section', 'mist-pd-card mist-pd-features'));
  st.features.innerHTML = `<h2>${pdIcon('sparkle', 18)}<span>Features</span></h2><div class="mist-pd-feature-grid"></div>`;
  st.features.hidden = true;
  st.reqs = own(pdMk('section', 'mist-pd-card mist-pd-reqs'));
  st.reqs.innerHTML = `<h2>${pdIcon('check', 18)}<span>Requirements</span></h2><div class="mist-pd-req-grid"></div>`;
  st.reviews = own(pdMk('section', 'mist-pd-card mist-pd-reviews'));
  st.reviews.innerHTML = `<header><h2>${pdIcon('youtube', 18)}<span>Pack Reviews</span></h2><button type="button" class="mist-pd-link-btn">View all on YouTube ${pdIcon('external', 14)}</button></header><div class="mist-pd-player" hidden><div class="mist-pd-player-frame"><iframe title="Review video" allow="autoplay; encrypted-media; picture-in-picture; web-share" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div><div class="mist-pd-player-bar"><strong></strong><button type="button" data-player="open">Open on YouTube</button><button type="button" class="mist-pd-small-btn" data-player="close" aria-label="Close player">${pdIcon('close', 15)}</button></div></div><div class="mist-pd-review-grid"></div>`;
  st.reviews.querySelector('.mist-pd-link-btn').addEventListener('click', () => pdOpen(`https://www.youtube.com/results?search_query=${encodeURIComponent(st.reviewQuery || `${st.ctx.project.title} minecraft`)}`));
  st.reviews.querySelector('[data-player="close"]').addEventListener('click', () => { const p = st.reviews.querySelector('.mist-pd-player'); p.hidden = true; p.querySelector('iframe').src = 'about:blank'; });
  st.reviews.querySelector('[data-player="open"]').addEventListener('click', () => { if (st.playing) pdOpen(`https://www.youtube.com/watch?v=${encodeURIComponent(st.playing)}`); });

  st.mini = own(pdMk('div', 'mist-pd-minibar'));
  st.mini.innerHTML = `<span class="mist-pd-mini-icon"></span><strong></strong><button type="button" class="mist-pd-mini-install">${pdIcon('download', 15)}<span>Install</span></button>`;
  st.mini.querySelector('button').addEventListener('click', () => pdInstall(detail, st));
  st.reviewsTab = own(pdMk('button'));
  st.reviewsTab.type = 'button'; st.reviewsTab.dataset.projectTab = 'reviews';
  st.reviewsTab.innerHTML = `${pdIcon('youtube', 17)}<span>Reviews</span>`;
  st.reviewsTab.addEventListener('click', () => requestAnimationFrame(() => st.reviews.scrollIntoView({ block: 'start', behavior: 'smooth' })));
  detail.mistOpenInstall = (versionId) => pdInstall(detail, st, versionId);

  const tabs = detail.querySelector(':scope > .mist-project-tabs');
  if (tabs && !tabs._mistPdWired) {
    tabs._mistPdWired = true;
    tabs.addEventListener('click', (event) => {
      const button = event.target.closest('[data-project-tab]');
      if (!button || button.dataset.projectTab === 'reviews') return;
      requestAnimationFrame(() => {
        const s = detail._mistPd; const scroller = pdScroller(detail);
        if (s && scroller && scroller.scrollTop > s.hero.offsetHeight) scroller.scrollTop = s.hero.offsetHeight;
        if (s) pdCheckClamp(detail, s);
      });
    });
  }
  const scroller = pdScroller(detail);
  if (scroller && 'IntersectionObserver' in window) {
    st.io = new IntersectionObserver(([entry]) => { detail.querySelector(':scope > .mist-project-tabs')?.classList.toggle('is-stuck', !entry.isIntersecting); }, { root: scroller, rootMargin: '-60px 0px 0px 0px' });
    st.io.observe(st.hero);
  }
  modrinthExtras(ctx.project).then((extras) => {
    if (!extras || detail._mistPd !== st) return;
    st.extras = extras; st.sig = ''; enhancePackDetail(detail);
  });
  pdLoadRelated(detail, st);
  pdLoadReviews(st);
  return st;
}
function pdEnsurePlacement(detail, st) {
  if (detail.firstElementChild !== st.hero) detail.prepend(st.hero);
  const tabs = detail.querySelector(':scope > .mist-project-tabs');
  if (tabs) {
    if (st.hero.nextElementSibling !== tabs) st.hero.after(tabs);
    if (tabs.nextElementSibling !== st.side) tabs.after(st.side);
    if (st.mini.parentElement !== tabs) tabs.appendChild(st.mini);
    if (st.reviewsTab.parentElement !== tabs) tabs.querySelector('[data-project-tab="overview"]')?.after(st.reviewsTab);
  } else if (st.hero.nextElementSibling !== st.side) st.hero.after(st.side);
  const body = pdBody(detail);
  if (!body) return;
  if (body.previousElementSibling !== st.aboutHead) body.before(st.aboutHead);
  let prev = body;
  [st.readMore, st.features, st.reqs, st.reviews].forEach((el) => { if (prev.nextElementSibling !== el) prev.after(el); prev = el; });
}
function pdPaintFav(st) {
  const on = Boolean(pdFavs()[st.ctx.key]);
  const fav = st.hero.querySelector('.mist-pd-fav');
  fav.classList.toggle('is-on', on);
  const label = on ? 'Favorited' : 'Add to Favorites';
  if (fav.querySelector('span').textContent !== label) fav.querySelector('span').textContent = label;
}
function pdTagline(st) {
  const x = st.extras || {};
  let text = x.description || st.ctx.project.description || '';
  if (!text && st.bodyEl) text = [...st.bodyEl.querySelectorAll('p')].map((p) => p.textContent.replace(/\s+/g, ' ').trim()).find((t) => t.length > 60) || '';
  text = text.replace(/<[^>]*>/g, '').trim();
  return text.length > 260 ? `${text.slice(0, 257).trim()}…` : text;
}
function pdRefresh(detail, st) {
  const { project, type, info, iconUrl, gallery } = st.ctx;
  const x = st.extras || {};
  const versions = pdVersions(detail);
  const title = project.title || 'Untitled';
  const author = x.ownerName || project.author || '';
  const range = pdMcRange(versions) || pdMcRange([{ gameVersions: x.gameVersions || [] }]);
  const loaders = [...new Set([...(project.loaders || []), ...(x.loaders || []), ...versions.flatMap((v) => v.loaders || [])].map((l) => String(l).toLowerCase()))].filter((l) => !['minecraft', 'datapack'].includes(l));
  const updated = x.updated || project.updatedAt || versions[0]?.publishedAt || '';
  const followers = x.followers || project.follows || 0;
  const h = st.hero;
  if (x.color) h.style.setProperty('--pd-accent', x.color);
  const banner = x.banner || (gallery.find((g) => g.featured) || gallery[0] || {}).url || '';
  const bg = h.querySelector('.mist-pd-hero-bg');
  const bgUrl = banner || iconUrl;
  bg.classList.toggle('is-icon', !banner);
  bg.style.backgroundImage = /^https:\/\//i.test(bgUrl) ? `url("${bgUrl.replace(/"/g, '%22')}")` : '';
  h.querySelector('.mist-pd-crumbs span').textContent = info[1];
  h.querySelector('.mist-pd-crumbs strong').textContent = title;
  pdFillIcon(h.querySelector('.mist-pd-hero-icon'), iconUrl, title);
  const sourceName = (project.source || 'modrinth') === 'curseforge' ? 'CurseForge' : 'Modrinth';
  h.querySelector('.mist-pd-chips').innerHTML = [`<span class="mist-pd-chip">${pdEsc(info[0])}</span>`, `<span class="mist-pd-chip is-muted">${sourceName}</span>`,
    ...(type === 'mod' || type === 'modpack' || type === 'shader' ? loaders.slice(0, 4).map((l) => `<span class="mist-pd-chip is-muted">${pdEsc(pdLoaderName(l))}</span>`) : [])].join('');
  h.querySelector('h1').textContent = title;
  h.querySelector('.mist-pd-by').innerHTML = author ? `by <b>${pdEsc(author)}</b>` : '';
  const stat = (icon, value, label) => `<span>${pdIcon(icon, 15)}<b>${pdEsc(value)}</b>${label ? ` ${pdEsc(label)}` : ''}</span>`;
  h.querySelector('.mist-pd-stats').innerHTML = [
    stat('download', formatCount(project.downloads), type === 'modpack' ? 'installs' : 'downloads'),
    followers ? stat('heart', formatCount(followers), 'followers') : '',
    updated ? stat('clock', pdAgo(updated), '') : '',
    versions.length ? stat('pack', versions.length, versions.length === 1 ? 'version' : 'versions') : '',
    range ? stat('world', range.label, '') : ''
  ].join('');
  const tagline = pdTagline(st);
  const tagEl = h.querySelector('.mist-pd-tagline');
  if (tagEl.textContent !== tagline) tagEl.textContent = tagline;
  const select = h.querySelector('.mist-pd-version select');
  const previous = select.value;
  if (!versions.length) select.replaceChildren(new Option(detail._mistLoading ? 'Loading versions…' : 'No versions available', ''));
  else select.replaceChildren(...versions.slice(0, 250).map((v) => {
    const games = (v.gameVersions || []).filter(pdIsRelease).sort(pdCompareMc);
    const mc = games[games.length - 1] || (v.gameVersions || [])[0] || '';
    return new Option(`${v.versionNumber || v.name || 'Version'}${mc ? ` — MC ${mc}` : ''}`, v.id);
  }));
  if ([...select.options].some((o) => o.value === previous)) select.value = previous;
  select.disabled = !versions.length;
  st.nativeSeen = null;
  h.querySelector('.mist-pd-install').disabled = !versions.length;
  st.mini.querySelector('button').disabled = !versions.length;
  pdPaintFav(st);
  pdFillIcon(st.mini.querySelector('.mist-pd-mini-icon'), iconUrl, title);
  st.mini.querySelector('strong').textContent = title;
  st.side.querySelector('.mist-pd-related h3 span').textContent = `Featured ${info[1]}`;
  pdPaintInfo(st, { title, author, range, loaders, updated, followers, versions, sourceName });
  pdPaintReqs(st, { range, loaders });
}
function pdPaintInfo(st, d) {
  const { project, type } = st.ctx; const x = st.extras || {};
  const authorBox = st.side.querySelector('.mist-pd-author');
  authorBox.innerHTML = `<span class="mist-pd-avatar"></span><span class="mist-pd-author-copy"><small>Created by</small><strong></strong></span>`;
  pdFillIcon(authorBox.querySelector('.mist-pd-avatar'), /^https:\/\//i.test(x.ownerAvatar || '') ? x.ownerAvatar : '', d.author || '?');
  authorBox.querySelector('strong').textContent = d.author || 'Unknown creator';
  if (d.author && (project.source || 'modrinth') === 'modrinth') {
    const profile = pdMk('button', 'mist-pd-small-btn'); profile.type = 'button'; profile.title = 'Open creator profile'; profile.setAttribute('aria-label', 'Open creator profile');
    profile.innerHTML = pdIcon('external', 15);
    profile.addEventListener('click', () => pdOpen(`https://modrinth.com/user/${encodeURIComponent(d.author)}`));
    authorBox.appendChild(profile);
  }
  const categories = [...new Set([...(project.categories || []), ...(x.categories || [])].map((c) => String(c).toLowerCase()))].filter((c) => !PD_NON_CATEGORY.has(c)).slice(0, 6);
  const env = pdEnvironment(x);
  const facts = [
    ['Downloads', formatCount(project.downloads)],
    d.followers ? ['Followers', formatCount(d.followers)] : null,
    x.published ? ['Published', pdDate(x.published)] : null,
    d.updated ? ['Updated', pdDate(d.updated)] : null,
    d.versions.length ? ['Versions', String(d.versions.length)] : null,
    d.range ? ['Minecraft', d.range.label] : null,
    d.loaders.length && type !== 'resourcepack' && type !== 'datapack' ? ['Loaders', d.loaders.map(pdLoaderName).join(', ')] : null,
    (project.license || x.license) ? ['License', String(project.license?.name || project.license || x.license)] : null,
    env ? ['Environment', env] : null,
    ['Source', d.sourceName]
  ].filter(Boolean);
  const dl = st.side.querySelector('.mist-pd-facts');
  dl.innerHTML = (categories.length ? `<div class="mist-pd-cats">${categories.map((c) => `<span>${pdEsc(c.replace(/-/g, ' '))}</span>`).join('')}</div>` : '') + facts.map(([k, v]) => `<div><dt>${pdEsc(k)}</dt><dd>${pdEsc(v)}</dd></div>`).join('');
  const links = [['Project page', pdProjectUrl(project), 'external'], ['Source code', x.sourceUrl, 'code'], ['Report issues', x.issuesUrl, 'bug'], ['Wiki', x.wikiUrl, 'routeResources'], ['Discord', x.discordUrl, 'discord'], ['Donate', x.donationUrl, 'heart']].filter(([, url]) => /^https:\/\//i.test(url || ''));
  const box = st.side.querySelector('.mist-pd-links');
  box.replaceChildren(...links.map(([label, url, icon]) => { const b = pdMk('button'); b.type = 'button'; b.innerHTML = `${pdIcon(icon, 15)}<span>${pdEsc(label)}</span>`; b.addEventListener('click', () => pdOpen(url)); return b; }));
  box.hidden = !links.length;
  const input = st.side.querySelector('.mist-pd-share-url input');
  input.value = pdProjectUrl(project) || 'No public page';
}
function pdEnvironment(x) {
  if (!x.clientSide && !x.serverSide) return '';
  if (x.serverSide === 'unsupported') return 'Client only';
  if (x.clientSide === 'unsupported') return 'Server only';
  if (x.clientSide === 'required' && x.serverSide === 'required') return 'Client & server';
  return 'Client & server (optional)';
}
function pdPaintReqs(st, d) {
  const { type } = st.ctx; const x = st.extras || {};
  const tiles = [];
  if (d.range) tiles.push(['world', 'Minecraft', d.range.label, d.range.min === d.range.max ? '' : `Latest: ${d.range.max}`]);
  const modLoaders = d.loaders.filter((l) => PD_MOD_LOADERS.includes(l)).map(pdLoaderName);
  if (type === 'mod' || type === 'modpack') tiles.push(['routeMods', 'Mod loader', modLoaders.join(' / ') || 'Any', type === 'modpack' ? 'Installed automatically with the pack' : 'Must match your instance']);
  else if (type === 'shader') tiles.push(['routeShaders', 'Shader loader', 'Iris or OptiFine', 'Install Iris on a Fabric instance']);
  else if (type === 'resourcepack') tiles.push(['routeResources', 'Mod loader', 'None — vanilla', 'Enable it in Options › Resource Packs']);
  else tiles.push(['routeDatapacks', 'Mod loader', 'None — vanilla', "Added to a world's datapacks folder"]);
  const env = pdEnvironment(x);
  if (env) tiles.push(['monitor', 'Environment', env, '']);
  if (d.range) {
    const java = pdCompareMc(d.range.max, '1.20.5') >= 0 ? 21 : pdCompareMc(d.range.max, '1.18') >= 0 ? 17 : pdCompareMc(d.range.max, '1.17') >= 0 ? 16 : 8;
    tiles.push(['java', 'Java', `Java ${java}`, 'Downloaded automatically']);
  }
  if (type === 'modpack') tiles.push(['chip', 'Memory', '4 GB+ recommended', 'Adjust in instance settings']);
  if (type === 'mod') tiles.push(['pack', 'Dependencies', 'Resolved automatically', 'Required mods install with it']);
  st.reqs.querySelector('.mist-pd-req-grid').innerHTML = tiles.map(([icon, label, value, note]) => `<div class="mist-pd-req"><span class="mist-pd-req-icon">${pdIcon(icon, 20)}</span><div><small>${pdEsc(label)}</small><strong>${pdEsc(value)}</strong>${note ? `<span>${pdEsc(note)}</span>` : ''}</div></div>`).join('');
}
function pdSyncNativeVersion(detail, st) {
  if (st.ctx.standalone) return;
  const native = pdNativeVersionSelect(detail, pdVersions(detail)); if (!native) return;
  if (st.nativeSeen === native.value) return;
  st.nativeSeen = native.value;
  const select = st.hero.querySelector('.mist-pd-version select');
  if ([...select.options].some((o) => o.value === native.value) && select.value !== native.value) select.value = native.value;
}
function pdSyncBody(detail, st) {
  const body = pdBody(detail); if (!body) return;
  st.bodyEl = body;
  const sig = `${body.textContent.length}|${body.childElementCount}`;
  if (st.bodySig === sig) return;
  st.bodySig = sig;
  pdPaintFeatures(st, body);
  const tagline = pdTagline(st); const tagEl = st.hero.querySelector('.mist-pd-tagline');
  if (tagEl.textContent !== tagline) tagEl.textContent = tagline;
  body.querySelectorAll('img').forEach((img) => { if (!img.complete && !img._mistPdWatch) { img._mistPdWatch = true; img.addEventListener('load', () => pdCheckClamp(detail, st), { once: true }); } });
  [0, 600, 1800, 4000].forEach((delay) => setTimeout(() => requestAnimationFrame(() => pdCheckClamp(detail, st)), delay));
}
function pdCheckClamp(detail, st) {
  const body = pdBody(detail);
  if (!body || !body.offsetParent || detail._mistPd !== st) return;
  const tall = body.scrollHeight > 760;
  if (detail.classList.contains('mist-pd-clamp') !== tall) detail.classList.toggle('mist-pd-clamp', tall);
  if (st.readMore.hidden === tall) st.readMore.hidden = !tall;
}
function pdPaintFeatures(st, body) {
  let items = [];
  for (const list of body.querySelectorAll('ul, ol')) {
    const lis = [...list.children].filter((li) => li.tagName === 'LI');
    const linkOnly = lis.filter((li) => { const a = li.querySelector('a'); return a && a.textContent.trim() === li.textContent.trim(); }).length > lis.length / 2;
    const texts = lis.map((li) => li.textContent.replace(/\s+/g, ' ').trim()).filter((t) => t.length > 2 && t.length <= 160);
    if (texts.length >= 3 && !linkOnly) { items = texts.slice(0, 6); break; }
  }
  if (!items.length) {
    items = [...body.querySelectorAll('h2, h3, h4')].map((h) => h.textContent.replace(/\s+/g, ' ').trim())
      .filter((t) => t.length >= 3 && t.length <= 80 && !/about|credit|license|support|donat|download|install|faq|changelog|discord|contact|links?$|gallery|screenshot|patreon|kofi|ko-fi|partner|sponsor/i.test(t)).slice(0, 6);
  }
  st.features.hidden = items.length < 2;
  st.features.querySelector('.mist-pd-feature-grid').replaceChildren(...items.map((text, index) => {
    const parts = text.split(/\s*[:–]\s+|\s+-\s+/);
    const card = pdMk('div', 'mist-pd-feature');
    card.innerHTML = `<span class="mist-pd-feature-icon">${pdIcon(PD_FEATURE_ICONS[index % PD_FEATURE_ICONS.length], 18)}</span><div><strong></strong><small></small></div>`;
    card.querySelector('strong').textContent = parts.length > 1 && parts[0].length <= 60 ? parts[0] : text;
    card.querySelector('small').textContent = parts.length > 1 && parts[0].length <= 60 ? parts.slice(1).join(' — ') : '';
    return card;
  }));
}
function pdSkeleton(count, cls) {
  const frag = document.createDocumentFragment();
  for (let i = 0; i < count; i++) frag.appendChild(pdMk('div', `mist-pd-skel ${cls}`));
  return frag;
}
function pdLoadReviews(st) {
  const grid = st.reviews.querySelector('.mist-pd-review-grid');
  const { project, info } = st.ctx;
  const title = project.title || '';
  if (!title) { st.reviews.hidden = true; return; }
  grid.replaceChildren(pdSkeleton(3, 'mist-pd-review-skel'));
  const query = `${title} minecraft ${info[2]} review`;
  st.reviewQuery = query;
  const fallback = (text, retry) => {
    const state = pdMk('div', 'mist-pd-empty');
    state.appendChild(pdMk('p', '', text));
    const button = pdMk('button', 'mist-pd-ghost-btn', retry ? 'Retry' : 'Search YouTube'); button.type = 'button';
    button.addEventListener('click', () => (retry ? pdLoadReviews(st) : pdOpen(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`)));
    state.appendChild(button); grid.replaceChildren(state);
  };
  pdVideos(query, 12).then((list) => {
    const tokens = pdTokens(title); const full = pdNorm(title);
    const need = tokens.length >= 3 ? 2 : 1;
    const hits = (list || []).filter((v) => { const t = pdNorm(v.title); return (full.length > 3 && t.includes(full)) || (tokens.length && tokens.filter((tok) => t.includes(tok)).length >= need); }).slice(0, 6);
    if (!hits.length) { fallback(`No review videos found for ${title} yet.`, false); return; }
    grid.replaceChildren(...hits.map((video) => {
      const card = pdMk('button', 'mist-pd-review'); card.type = 'button';
      card.innerHTML = `<span class="mist-pd-thumb"><img loading="lazy" alt=""><span class="mist-pd-play">${pdIcon('play', 22)}</span>${video.duration ? `<em>${pdEsc(video.duration)}</em>` : ''}</span><strong></strong><small></small>`;
      card.querySelector('img').src = `https://i.ytimg.com/vi/${encodeURIComponent(video.id)}/mqdefault.jpg`;
      card.querySelector('strong').textContent = video.title;
      card.querySelector('small').textContent = [video.channel, video.views, video.published].filter(Boolean).join(' · ');
      card.addEventListener('click', () => {
        const player = st.reviews.querySelector('.mist-pd-player');
        st.playing = video.id;
        player.querySelector('iframe').src = `https://www.youtube.com/embed/${encodeURIComponent(video.id)}?autoplay=1&rel=0&playsinline=1&origin=http://localhost`;
        player.querySelector('.mist-pd-player-bar strong').textContent = video.title;
        player.hidden = false;
        st.reviews.querySelectorAll('.mist-pd-review').forEach((c) => c.classList.toggle('is-active', c === card));
        player.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      });
      return card;
    }));
  }).catch(() => fallback('Could not load review videos.', true));
}
function pdLoadRelated(detail, st) {
  const list = st.side.querySelector('.mist-pd-related-list');
  const { project, type } = st.ctx;
  list.replaceChildren(pdSkeleton(4, 'mist-pd-related-skel'));
  const source = project.source || 'modrinth';
  const categories = (project.categories || []).filter((c) => !PD_NON_CATEGORY.has(String(c).toLowerCase()));
  const category = source === 'modrinth' ? categories[0] || null : null;
  const run = (opts) => Promise.resolve(window.mist.catalog.search({ source, projectType: type, query: '', gameVersion: null, loader: null, offset: 0, limit: 20, ...opts }))
    .then((r) => (r && (r.hits || r.results)) || (Array.isArray(r) ? r : []));
  const search = (cat) => run({ category: cat, sort: 'downloads' }).catch(() => run({ category: cat, sort: 'relevance' }));
  search(category).then(async (hits) => {
    if (category && hits.length < 6) { try { hits = [...hits, ...(await search(null))]; } catch {} }
    const seen = new Set([String(project.id), String(project.slug)]);
    st.related = hits.filter((hit) => { const id = String(hit.id); if (seen.has(id) || seen.has(String(hit.slug))) return false; seen.add(id); return true; });
    st.relatedPage = 0;
    pdPaintRelated(detail, st);
  }).catch(() => { list.replaceChildren(pdMk('p', 'mist-pd-muted', 'Could not load related packs.')); });
}
function pdPaintRelated(detail, st) {
  const list = st.side.querySelector('.mist-pd-related-list');
  const all = st.related || [];
  const card = st.side.querySelector('.mist-pd-related');
  card.hidden = !all.length;
  if (!all.length) return;
  const pages = Math.max(1, Math.ceil(all.length / 4));
  const page = (st.relatedPage || 0) % pages;
  const { type } = st.ctx;
  list.replaceChildren(...all.slice(page * 4, page * 4 + 4).map((hit) => {
    const row = pdMk('button', 'mist-pd-related-item'); row.type = 'button';
    row.innerHTML = `<span class="mist-pd-related-icon"></span><span class="mist-pd-related-copy"><strong></strong><small></small></span>`;
    pdFillIcon(row.querySelector('.mist-pd-related-icon'), /^https:\/\//i.test(hit.iconUrl || '') ? hit.iconUrl : '', hit.title);
    row.querySelector('strong').textContent = hit.title || 'Untitled';
    row.querySelector('small').textContent = [hit.author, hit.downloads ? `${formatCount(hit.downloads)} downloads` : ''].filter(Boolean).join(' · ');
    row.addEventListener('click', () => {
      if (type === 'modpack') {
        closeStandaloneProject();
        location.hash = `#/modpacks?project=${encodeURIComponent(hit.id)}&source=${encodeURIComponent(hit.source || 'modrinth')}`;
        return;
      }
      if (!st.ctx.standalone) detail.closest('.overlay')?.querySelector('.modal-close')?.click();
      openStandaloneProject(hit, type);
    });
    return row;
  }));
}
function pdInstall(detail, st, versionId) {
  const { project, type, iconUrl, standalone } = st.ctx;
  const versions = pdVersions(detail);
  const id = versionId || st.hero.querySelector('.mist-pd-version select').value || versions[0]?.id;
  if (!versions.length) { showMistToast(detail._mistLoading ? 'Versions are still loading…' : 'No downloadable versions for this project.', 'warn'); return; }
  if (type === 'modpack') {
    if (standalone) { closeStandaloneProject(); location.hash = `#/modpacks?project=${encodeURIComponent(project.id)}&source=${encodeURIComponent(project.source || 'modrinth')}`; return; }
    const native = pdNativeVersionSelect(detail, versions);
    if (native && id) { pdSetNative(native, String(id)); st.nativeSeen = String(id); }
    const version = versions.find((v) => String(v.id) === String(id)) || versions[0];
    const games = (version?.gameVersions || []).filter(pdIsRelease).sort(pdCompareMc);
    pdPendingModpack = { title: project.title || 'Modpack', iconUrl, version: version?.versionNumber || version?.name || '', gameVersion: games[games.length - 1] || (version?.gameVersions || [])[0] || '' };
    setTimeout(() => {
      const scope = detail.closest('.overlay') || document;
      const button = [...scope.querySelectorAll('.modal-footer button')].find((b) => /install/i.test(b.textContent));
      if (button && !button.disabled) button.click();
      else showMistToast(button ? 'This modpack restricts third-party downloads. Open the project page to get it.' : 'Install is not available for this modpack.', 'warn');
    }, 60);
    return;
  }
  const deps = detail.querySelector('.install-box .checkbox-row input');
  openInstallDialog({ project, type, versions, versionId: id, iconUrl, deps: deps ? deps.checked : type === 'mod' });
}

/* ------------------------------------------------------------- standalone viewer (data packs, related) */
function closeStandaloneProject() {
  const overlay = document.getElementById('mist-pd-overlay'); if (!overlay) return;
  const detail = overlay.querySelector('.mist-pd');
  if (detail) pdTeardown(detail);
  overlay.remove();
}
function openStandaloneProject(hit, type) {
  closeStandaloneProject();
  const overlay = pdMk('div'); overlay.id = 'mist-pd-overlay';
  overlay.setAttribute('role', 'dialog'); overlay.setAttribute('aria-label', `${hit.title || 'Project'} details`);
  const scroll = pdMk('div', 'mist-pd-scroll');
  const detail = pdMk('div', 'mist-pd mist-pd-standalone');
  detail._mistType = type;
  detail._mistProjectData = { ...hit, projectType: type, source: hit.source || 'modrinth' };
  detail._mistIconUrl = /^https:\/\//i.test(hit.iconUrl || '') ? hit.iconUrl : '';
  detail._mistRemoteVersions = []; detail._mistGalleryData = []; detail._mistLoading = true;
  const versions = pdMk('section', 'mist-version-browser'); versions.innerHTML = VERSION_BROWSER_HTML;
  const changelog = pdMk('section', 'mist-project-changelog');
  const gallery = pdMk('div', 'gallery');
  const body = pdMk('div', 'mist-pd-body'); body.appendChild(pdMk('p', 'mist-content-state', 'Loading description…'));
  detail.append(buildProjectTabs(detail), versions, changelog, gallery, body);
  scroll.appendChild(detail); overlay.appendChild(scroll); document.body.appendChild(overlay);
  enhancePackDetail(detail); renderProjectVersions(detail);
  const finish = () => { if (!detail.isConnected) return; detail._mistLoading = false; enhancePackDetail(detail); renderProjectVersions(detail); };
  Promise.resolve(window.mist.catalog.project(detail._mistProjectData.source, hit.id)).then((data) => {
    if (!detail.isConnected || !data) { finish(); return; }
    const { versions: list, gallery: images, body: markdown, ...rest } = data;
    detail._mistRemoteVersions = Array.isArray(list) ? list : [];
    detail._mistGalleryData = Array.isArray(images) ? images : [];
    detail._mistProjectData = { ...detail._mistProjectData, ...rest, id: hit.id, projectType: type, source: detail._mistProjectData.source };
    if (/^https:\/\//i.test(rest.iconUrl || '')) detail._mistIconUrl = rest.iconUrl;
    try { body.replaceChildren(...renderProjectBody(String(markdown || rest.description || hit.description || 'No description provided.'))); }
    catch { body.textContent = String(rest.description || hit.description || ''); }
    gallery.replaceChildren(...detail._mistGalleryData.filter((g) => /^https:\/\//i.test(g.url || '')).map((g) => { const img = pdMk('img'); img.src = g.url; img.alt = g.title || ''; img.loading = 'lazy'; return img; }));
    if (!gallery.childElementCount) gallery.appendChild(pdMk('p', 'mist-content-state', 'No gallery images were provided for this project.'));
    finish();
  }).catch((error) => {
    body.replaceChildren(pdMk('p', 'mist-content-state', `Could not load this project. ${error?.message || ''}`.trim()));
    finish();
  });
}
window.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape' || !document.getElementById('mist-pd-overlay') || document.getElementById('mist-install-dialog')) return;
  event.stopPropagation(); event.preventDefault();
  closeStandaloneProject();
}, true);
window.addEventListener('hashchange', closeStandaloneProject);


/* ------------------------------------------------------------------ install dialog */
const pdGames = (v) => v?.gameVersions || v?.game_versions || [];
const pdVLoaders = (v) => (v?.loaders || []).map((l) => String(l).toLowerCase());
const pdInstLoader = (inst) => String(inst?.loader?.type || inst?.loader || 'vanilla').toLowerCase();
const pdChannel = (v) => String(v?.versionType || v?.channel || v?.version_type || 'release').toLowerCase();

function pdVersionFits(v, inst, type) {
  const games = pdGames(v);
  if (games.length && !games.includes(inst.gameVersion)) return false;
  if (type === 'mod' || type === 'modpack') {
    const loaders = pdVLoaders(v), have = pdInstLoader(inst);
    if (!loaders.length) return true;
    if (loaders.includes(have)) return true;
    if (have === 'quilt' && loaders.includes('fabric')) return true;
    return false;
  }
  return true;
}

function pdPlan(inst, versions, chosenId, type) {
  if (!versions || !versions.length) return { status: 'bad', reason: 'No downloadable files' };
  const chosen = versions.find((v) => v.id === chosenId) || versions[0];
  const have = pdInstLoader(inst);
  if (type === 'mod' && (have === 'vanilla' || have === 'minecraft' || have === '')) return { status: 'bad', reason: 'Needs a mod loader', version: chosen };
  if (pdVersionFits(chosen, inst, type)) return { status: 'ok', version: chosen };
  const fitting = versions.filter((v) => pdVersionFits(v, inst, type));
  if (fitting.length) {
    const best = fitting.find((v) => pdChannel(v) === 'release') || fitting[0];
    return { status: 'alt', version: best, reason: `Uses ${best.versionNumber || best.name || 'a compatible build'}` };
  }
  if (type === 'shader' || type === 'resourcepack' || type === 'datapack') {
    return { status: 'warn', version: chosen, reason: `Made for ${pdGames(chosen).slice(0, 2).join(', ') || 'another version'}` };
  }
  const gamesOk = versions.some((v) => !pdGames(v).length || pdGames(v).includes(inst.gameVersion));
  if (!gamesOk) return { status: 'bad', reason: `No build for Minecraft ${inst.gameVersion}` };
  const wants = [...new Set(versions.flatMap(pdVLoaders))].slice(0, 2).map(pdLoaderName).join(' / ');
  return { status: 'bad', reason: `Needs ${wants || 'a different'} loader` };
}

const PD_STATUS_RANK = { ok: 0, alt: 1, warn: 1, bad: 2 };
const PD_BADGE = { ok: ['Compatible', 'check'], alt: ['Auto-matched', 'refresh'], warn: ['Version mismatch', 'alert'], bad: ['Incompatible', 'close'] };

function pdDialogCleanup() {
  const dlg = document.getElementById('mist-install-dialog');
  if (dlg && dlg._mistKeys) window.removeEventListener('keydown', dlg._mistKeys, true);
  return dlg;
}
function closeInstallDialog(force) {
  const dlg = document.getElementById('mist-install-dialog');
  if (!dlg) return;
  dlg._mistClosed = true;
  if (dlg._mistBusy) dlg._mistCancel?.();
  pdDialogCleanup();
  dlg.remove();
}

function openInstallDialog(opts) {
  closeInstallDialog(true);
  const { project = {}, type = 'mod', versions = [], iconUrl = '' } = opts || {};
  const info = PD_TYPES[type] || PD_TYPES.mod;
  const isDatapack = type === 'datapack';
  let versionId = opts?.versionId || versions[0]?.id || null;
  const state = { step: 'instance', inst: null, world: null, rows: [], filter: '', worlds: [], deps: type === 'mod' };

  const dlg = pdMk('div'); dlg.id = 'mist-install-dialog'; dlg.setAttribute('role', 'dialog'); dlg.setAttribute('aria-modal', 'true');
  dlg.innerHTML = `<div class="mist-id-backdrop"></div><div class="mist-id-card">
    <header class="mist-id-head"><span class="mist-id-icon"></span><div class="mist-id-titles"><small class="mist-id-kicker"></small><strong class="mist-id-title"></strong><span class="mist-id-version"></span></div><button type="button" class="mist-id-x" aria-label="Close">${pdIcon('close', 16)}</button></header>
    <ol class="mist-id-steps" hidden><li data-step="instance"><b>1</b>Choose instance</li><li data-step="world"><b>2</b>Choose world <small>data packs live inside a world</small></li></ol>
    <div class="mist-id-tools"><label class="mist-id-search">${pdIcon('search', 15)}<input type="search" placeholder="Search instances…" aria-label="Search instances"></label><span class="mist-id-count"></span></div>
    <div class="mist-id-list" role="listbox" tabindex="0"></div>
    <footer class="mist-id-foot"><label class="mist-id-deps" hidden><input type="checkbox" checked><span>Also install required dependencies</span></label><p class="mist-id-note"></p><div class="mist-id-actions"><button type="button" class="mist-id-back" hidden>Back</button><button type="button" class="mist-id-cancel">Cancel</button><button type="button" class="mist-id-confirm" disabled></button></div></footer>
  </div>`;
  document.body.appendChild(dlg);
  const $ = (s) => dlg.querySelector(s);
  const live = () => dlg.isConnected && !dlg._mistClosed && !dlg._mistCancelled;
  const list = $('.mist-id-list'), confirm = $('.mist-id-confirm'), note = $('.mist-id-note'), search = $('.mist-id-search input');

  const icon = $('.mist-id-icon');
  if (iconUrl) { const img = pdMk('img'); img.src = iconUrl; img.alt = ''; img.onerror = () => { if (live()) icon.textContent = (project.title || '?').slice(0, 1).toUpperCase(); }; icon.appendChild(img); }
  else icon.textContent = (project.title || '?').slice(0, 1).toUpperCase();
  $('.mist-id-kicker').textContent = `Install ${info[0]}`;
  $('.mist-id-title').textContent = project.title || 'Untitled';
  const paintVersionLine = () => {
    const v = versions.find((x) => x.id === versionId);
    $('.mist-id-version').textContent = v ? `${v.versionNumber || v.name || 'Version'}${pdGames(v).length ? ` · for ${pdGames(v).slice(0, 3).join(', ')}${pdGames(v).length > 3 ? '…' : ''}` : ''}` : 'Latest version';
  };
  paintVersionLine();
  if (isDatapack) $('.mist-id-steps').hidden = false;
  if (type === 'mod') { $('.mist-id-deps').hidden = false; $('.mist-id-deps input').addEventListener('change', (e) => { if (live() && !dlg._mistBusy) state.deps = e.target.checked; }); }

  const setStep = (step) => {
    state.step = step;
    dlg.querySelectorAll('.mist-id-steps li').forEach((li) => { li.classList.toggle('is-active', li.dataset.step === step); li.classList.toggle('is-done', step === 'world' && li.dataset.step === 'instance'); });
    $('.mist-id-back').hidden = step !== 'world';
    search.value = ''; state.filter = '';
    search.placeholder = step === 'world' ? 'Search worlds…' : 'Search instances…';
    $('.mist-id-tools').hidden = false; $('.mist-id-foot').hidden = false;
  };

  const stateMsg = (text, action) => {
    const box = pdMk('div', 'mist-id-state'); box.appendChild(pdMk('p', '', text));
    if (action) { const b = pdMk('button', 'mist-id-state-btn', action[0]); b.type = 'button'; b.addEventListener('click', action[1]); box.appendChild(b); }
    list.replaceChildren(box);
  };

  const updateFoot = () => {
    const sel = state.step === 'world' ? state.world : state.inst;
    const row = state.step === 'instance' && state.inst ? state.rows.find((r) => r.inst.id === state.inst.id) : null;
    confirm.disabled = !sel || (row && row.plan.status === 'bad');
    if (state.step === 'instance') {
      confirm.innerHTML = `${pdIcon(isDatapack ? 'chevronRight' : 'download', 15)}<span></span>`;
      confirm.querySelector('span').textContent = !state.inst ? 'Select an instance' : isDatapack ? 'Choose world' : `Install to ${state.inst.name}`;
      note.className = 'mist-id-note';
      note.textContent = row ? (row.plan.status === 'alt' ? `The selected version doesn't fit — ${row.plan.reason}.` : row.plan.status === 'warn' ? `${row.plan.reason}. It may still work.` : row.plan.status === 'bad' ? row.plan.reason : '') : '';
      if (row && row.plan.status !== 'ok') note.classList.add(`is-${row.plan.status}`);
    } else {
      confirm.innerHTML = `${pdIcon('download', 15)}<span></span>`;
      confirm.querySelector('span').textContent = state.world ? `Install to ${state.world.name}` : 'Select a world';
      note.className = 'mist-id-note'; note.textContent = state.inst ? `Instance: ${state.inst.name}` : '';
    }
  };

  const select = (key, scroll) => {
    if (!live() || dlg._mistBusy) return;
    if (state.step === 'world') state.world = state.worlds.find((w) => w.folder === key) || null;
    else state.inst = state.rows.find((r) => r.inst.id === key)?.inst || null;
    list.querySelectorAll('.mist-id-row').forEach((r) => { const on = r.dataset.key === key; r.classList.toggle('is-selected', on); r.setAttribute('aria-selected', on ? 'true' : 'false'); if (on && scroll) r.scrollIntoView({ block: 'nearest' }); });
    updateFoot();
  };

  const paintInstances = () => {
    const q = state.filter.toLowerCase();
    const shown = state.rows.filter((r) => !q || `${r.inst.name} ${r.inst.gameVersion} ${pdInstLoader(r.inst)}`.toLowerCase().includes(q));
    const okCount = state.rows.filter((r) => r.plan.status !== 'bad').length;
    $('.mist-id-count').textContent = q ? `${shown.length} of ${state.rows.length} shown` : `${okCount} of ${state.rows.length} compatible`;
    if (!shown.length) { stateMsg(`No instances match “${state.filter}”.`); return; }
    list.replaceChildren(...shown.map((r) => {
      const row = pdMk('button', `mist-id-row is-${r.plan.status}`); row.type = 'button'; row.dataset.key = r.inst.id; row.setAttribute('role', 'option');
      row.appendChild(pdInstallArt(r.inst, 'mist-id-art'));
      const copy = pdMk('span', 'mist-id-copy'); copy.appendChild(pdMk('strong', '', r.inst.name || 'Instance'));
      const played = r.inst.lastPlayed ? pdAgo(r.inst.lastPlayed) : '';
      copy.appendChild(pdMk('small', '', [`Minecraft ${r.inst.gameVersion || '?'}`, pdLoaderName(pdInstLoader(r.inst)), played ? `played ${played}` : 'never played'].join(' · ')));
      if (r.plan.status !== 'ok' && r.plan.reason) copy.appendChild(pdMk('em', '', r.plan.reason));
      row.appendChild(copy);
      const badge = pdMk('span', 'mist-id-badge'); badge.innerHTML = pdIcon(PD_BADGE[r.plan.status][1], 12); badge.appendChild(pdMk('span', '', PD_BADGE[r.plan.status][0]));
      row.appendChild(badge);
      row.appendChild(pdMk('span', 'mist-id-radio'));
      if (r.plan.status === 'bad') row.setAttribute('aria-disabled', 'true');
      if (state.inst && state.inst.id === r.inst.id) { row.classList.add('is-selected'); row.setAttribute('aria-selected', 'true'); }
      row.addEventListener('click', () => { if (r.plan.status !== 'bad') select(r.inst.id); });
      row.addEventListener('dblclick', () => { if (r.plan.status !== 'bad') { select(r.inst.id); next(); } });
      return row;
    }));
  };

  const paintWorlds = () => {
    const q = state.filter.toLowerCase();
    const shown = state.worlds.filter((w) => !q || String(w.name).toLowerCase().includes(q));
    $('.mist-id-count').textContent = `${state.worlds.length} world${state.worlds.length === 1 ? '' : 's'}`;
    if (!shown.length) { stateMsg('No worlds match this search.'); return; }
    list.replaceChildren(...shown.map((w) => {
      const row = pdMk('button', 'mist-id-row is-ok'); row.type = 'button'; row.dataset.key = w.folder; row.setAttribute('role', 'option');
      const art = pdMk('span', 'mist-id-art');
      if (w.iconDataUrl) { const img = pdMk('img'); img.src = w.iconDataUrl; img.alt = ''; art.appendChild(img); } else art.innerHTML = pdIcon('world', 20);
      row.appendChild(art);
      const copy = pdMk('span', 'mist-id-copy'); copy.appendChild(pdMk('strong', '', w.name)); copy.appendChild(pdMk('small', '', w.versionName || 'Minecraft world'));
      row.appendChild(copy); row.appendChild(pdMk('span', 'mist-id-radio'));
      if (state.world && state.world.folder === w.folder) row.classList.add('is-selected');
      row.addEventListener('click', () => select(w.folder));
      row.addEventListener('dblclick', () => { select(w.folder); next(); });
      return row;
    }));
  };
  const paint = () => (state.step === 'world' ? paintWorlds() : paintInstances());

  const loadInstances = () => {
    setStep('instance');
    stateMsg('Reading installations…');
    pdInstallations(true).then((insts) => {
      if (!live() || dlg._mistBusy) return;
      if (!insts.length) {
        $('.mist-id-count').textContent = '';
        stateMsg('You have no instances yet.', ['Create an installation', () => { closeInstallDialog(true); closeStandaloneProject(); const pd = document.querySelector('.overlay .mist-pd'); if (pd) pdClose(pd); setTimeout(() => document.querySelector('.mist-dock-create')?.click(), 120); }]);
        updateFoot(); return;
      }
      state.rows = insts.map((inst) => ({ inst, plan: pdPlan(inst, versions, versionId, type) }))
        .sort((a, b) => (PD_STATUS_RANK[a.plan.status] - PD_STATUS_RANK[b.plan.status]) || (new Date(b.inst.lastPlayed || 0) - new Date(a.inst.lastPlayed || 0)));
      const activeId = document.querySelector('.installation-select-input')?.value;
      const pick = state.rows.find((r) => r.inst.id === activeId && r.plan.status !== 'bad') || state.rows.find((r) => r.plan.status !== 'bad');
      state.inst = pick ? pick.inst : null;
      paintInstances(); updateFoot();
      list.querySelector('.is-selected')?.scrollIntoView({ block: 'nearest' });
    });
  };

  const loadWorlds = async () => {
    setStep('world'); state.world = null; updateFoot();
    stateMsg('Reading worlds…');
    let worlds = [];
    try { worlds = (await window.mist.worlds.list(state.inst.id)) || []; } catch {}
    if (!live() || dlg._mistBusy || state.step !== 'world') return;
    state.worlds = worlds;
    if (!worlds.length) { $('.mist-id-count').textContent = ''; stateMsg(`“${state.inst.name}” has no worlds yet. Play once and create a world first.`); updateFoot(); return; }
    state.world = worlds[0]; paintWorlds(); updateFoot();
  };

  const showDone = (result, inst, world) => {
    const installed = result?.installed || [], skipped = result?.skipped || [];
    $('.mist-id-tools').hidden = true; $('.mist-id-steps').hidden = true;
    const box = pdMk('div', 'mist-id-done');
    const mark = pdMk('span', `mist-id-done-mark${skipped.length && !installed.length ? ' is-warn' : ''}`); mark.innerHTML = pdIcon(skipped.length && !installed.length ? 'alert' : 'check', 26);
    box.appendChild(mark);
    box.appendChild(pdMk('strong', '', skipped.length && !installed.length ? 'Nothing was installed' : `${project.title || info[0]} installed`));
    box.appendChild(pdMk('p', '', world ? `Added to world “${world.name}” in ${inst.name}.` : `Added to ${inst.name}.`));
    if (installed.length) { const ul = pdMk('ul', 'mist-id-files'); installed.slice(0, 8).forEach((f) => ul.appendChild(pdMk('li', '', typeof f === 'string' ? f : (f.fileName || f.name || f.title || 'file')))); if (installed.length > 8) ul.appendChild(pdMk('li', 'is-more', `+${installed.length - 8} more`)); box.appendChild(ul); }
    if (skipped.length) { const ul = pdMk('ul', 'mist-id-files is-skipped'); skipped.slice(0, 6).forEach((f) => ul.appendChild(pdMk('li', '', typeof f === 'string' ? f : `${f.title || f.name || f.projectId || 'file'}${f.reason ? ` — ${f.reason}` : ''}`))); box.appendChild(ul); }
    list.replaceChildren(box);
    $('.mist-id-deps').hidden = true; note.textContent = ''; $('.mist-id-back').hidden = true;
    const again = $('.mist-id-cancel'); again.textContent = 'Install to another instance';
    again.onclick = (e) => { e.stopImmediatePropagation(); again.textContent = 'Cancel'; again.onclick = null; if (type === 'mod') $('.mist-id-deps').hidden = false; if (isDatapack) $('.mist-id-steps').hidden = false; confirm.onclick = null; loadInstances(); };
    confirm.disabled = false; confirm.innerHTML = `${pdIcon('check', 15)}<span>Done</span>`;
    confirm.onclick = (e) => { e.stopImmediatePropagation(); closeInstallDialog(true); };
  };

  const runInstall = async () => {
    if (!live() || dlg._mistBusy) return;
    const inst = state.inst, world = state.world;
    const row = state.rows.find((r) => r.inst.id === inst.id);
    const ver = row?.plan.version?.id || versionId;
    const requestId = crypto.randomUUID();
    dlg._mistCancel = () => {
      if (dlg._mistCancelled) return;
      dlg._mistCancelled = true;
      // Install is invoked synchronously below, before a close event can cancel.
      // Closing never waits for IPC; late install/cancel results cannot repaint.
      try { Promise.resolve(window.mist.catalog.cancel(requestId)).catch(() => {}); } catch {}
    };
    dlg._mistBusy = true; dlg.classList.add('is-busy');
    const controls = [...dlg.querySelectorAll('.mist-id-row, .mist-id-back, .mist-id-search input, .mist-id-deps input')];
    const disabled = controls.map((control) => control.disabled);
    controls.forEach((control) => { control.disabled = true; });
    const finishBusy = () => {
      dlg._mistBusy = false; dlg.classList.remove('is-busy'); list.removeAttribute('aria-busy');
      controls.forEach((control, index) => { control.disabled = disabled[index]; });
    };
    confirm.disabled = true; confirm.innerHTML = `<span class="mist-id-spin"></span><span>Installing…</span>`;
    note.textContent = 'Cancelling stops remaining work; files already installed may remain.';
    list.setAttribute('aria-busy', 'true');
    try {
      const result = await window.mist.catalog.install({ requestId, installationId: inst.id, projectType: type, source: project.source || 'modrinth', projectId: project.id, versionId: ver, withDependencies: type === 'mod' ? state.deps : false, worldFolder: isDatapack ? world.folder : null });
      if (!live()) return;
      finishBusy();
      showDone(result, inst, isDatapack ? world : null);
      showMistToast(`${project.title || info[0]} installed to ${isDatapack ? world.name : inst.name}.`, 'success');
    } catch (error) {
      if (!live()) return;
      finishBusy();
      updateFoot(); note.className = 'mist-id-note is-bad'; note.textContent = error instanceof Error ? error.message : 'Install failed.';
      showMistToast('Install failed.', 'error');
    } finally {
      dlg._mistCancel = null;
      dlg._mistBusy = false;
    }
  };

  function next() {
    if (!live() || dlg._mistBusy || confirm.disabled) return;
    if (confirm.onclick) { confirm.onclick(new Event('click')); return; }
    if (state.step === 'instance' && isDatapack) { if (state.inst) loadWorlds(); return; }
    if (state.inst) runInstall();
  }

  confirm.addEventListener('click', () => { if (!confirm.onclick) next(); });
  $('.mist-id-cancel').addEventListener('click', () => { if (!$('.mist-id-cancel').onclick) closeInstallDialog(); });
  $('.mist-id-x').addEventListener('click', () => closeInstallDialog());
  $('.mist-id-backdrop').addEventListener('click', () => closeInstallDialog());
  $('.mist-id-back').addEventListener('click', () => { if (!live() || dlg._mistBusy) return; state.world = null; setStep('instance'); paintInstances(); updateFoot(); });
  search.addEventListener('input', () => { if (!live() || dlg._mistBusy) return; state.filter = search.value.trim(); paint(); });

  dlg._mistKeys = (event) => {
    if (!live()) return;
    if (event.key === 'Escape') { event.stopPropagation(); event.preventDefault(); closeInstallDialog(); return; }
    if (dlg._mistBusy) return;
    if (event.key === 'Enter' && event.target !== $('.mist-id-cancel') && event.target !== $('.mist-id-back')) { event.preventDefault(); next(); return; }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      const rows = [...list.querySelectorAll('.mist-id-row:not([aria-disabled="true"])')];
      if (!rows.length) return;
      event.preventDefault();
      const idx = rows.findIndex((r) => r.classList.contains('is-selected'));
      const nextRow = rows[Math.max(0, Math.min(rows.length - 1, idx + (event.key === 'ArrowDown' ? 1 : -1)))];
      select(nextRow.dataset.key, true);
    }
  };
  window.addEventListener('keydown', dlg._mistKeys, true);
  requestAnimationFrame(() => { if (!live()) return; dlg.classList.add('is-open'); search.focus({ preventScroll: true }); });
  loadInstances();
}

/* ------------------------------------------------------------------ modpack install dialog */
function enhanceModpackInstallDialog() {
  const modal = document.querySelector('.overlay.modpack-install-dialog .modal');
  if (!modal) return;
  const field = modal.querySelector('.install-target-field');
  const select = field?.querySelector('select');
  if (!select) return;
  if (!pdInstCache) pdInstallations();
  const pending = pdPendingModpack || {};
  const opts = [...select.options];
  const sig = `${opts.map((o) => `${o.value}:${o.textContent}`).join('|')}#${select.value}#${pending.title || ''}#${pdInstCache?.list?.length ?? -1}`;
  if (modal._mistMpSig === sig) return;
  modal._mistMpSig = sig;
  if (!pdInstCache?.list) pdInstCache?.promise?.then(() => { modal._mistMpSig = ''; enhanceModpackInstallDialog(); });

  let head = modal.querySelector(':scope .mist-mp-head');
  if (pending.title) {
    if (!head) { head = pdMk('div', 'mist-mp-head'); (modal.querySelector('.modal-body') || modal).prepend(head); }
    head.replaceChildren();
    const art = pdMk('span', 'mist-mp-icon');
    if (pending.iconUrl) { const img = pdMk('img'); img.src = pending.iconUrl; img.alt = ''; art.appendChild(img); } else art.textContent = pending.title.slice(0, 1).toUpperCase();
    const copy = pdMk('span', 'mist-mp-copy');
    copy.appendChild(pdMk('small', '', 'Install modpack'));
    copy.appendChild(pdMk('strong', '', pending.title));
    copy.appendChild(pdMk('span', '', [pending.version, pending.gameVersion ? `Minecraft ${pending.gameVersion}` : ''].filter(Boolean).join(' · ')));
    head.append(art, copy);
  }

  let grid = modal.querySelector('.mist-mp-targets');
  if (!grid) { grid = pdMk('div', 'mist-mp-targets'); grid.setAttribute('role', 'radiogroup'); grid.setAttribute('aria-label', 'Install target'); field.after(grid); }
  const label = modal.querySelector('.mist-mp-label') || pdMk('p', 'mist-mp-label', 'Where should it go?');
  if (!label.isConnected) grid.before(label);
  const insts = pdInstCache?.list || [];
  grid.replaceChildren(...opts.map((opt) => {
    const card = pdMk('button', 'mist-mp-target'); card.type = 'button'; card.setAttribute('role', 'radio');
    const on = opt.value === select.value; card.classList.toggle('is-selected', on); card.setAttribute('aria-checked', on ? 'true' : 'false');
    const copy = pdMk('span', 'mist-mp-copy');
    if (opt.value === '') {
      card.classList.add('is-new');
      const art = pdMk('span', 'mist-mp-art is-new'); art.innerHTML = pdIcon('plus', 20); card.appendChild(art);
      copy.appendChild(pdMk('strong', '', 'Create a new instance'));
      copy.appendChild(pdMk('small', '', 'Clean install with the pack’s own loader and settings'));
      card.appendChild(copy);
      const badge = pdMk('span', 'mist-mp-badge is-good', 'Recommended'); card.appendChild(badge);
    } else {
      const parts = String(opt.textContent).split(' · ');
      const loader = parts.length >= 3 ? parts.pop() : '';
      const game = parts.length >= 2 ? parts.pop() : '';
      const name = parts.join(' · ') || opt.textContent;
      const inst = insts.find((i) => i.id === opt.value) || { name, icon: '' };
      card.appendChild(pdInstallArt(inst, 'mist-mp-art'));
      copy.appendChild(pdMk('strong', '', name));
      copy.appendChild(pdMk('small', '', [game && `Minecraft ${game}`, loader].filter(Boolean).join(' · ') || 'Existing instance'));
      card.appendChild(copy);
      if (pending.gameVersion && game) {
        const match = game === pending.gameVersion;
        card.appendChild(pdMk('span', `mist-mp-badge ${match ? 'is-good' : 'is-warn'}`, match ? 'Matches pack' : 'Different version'));
      }
    }
    card.appendChild(pdMk('span', 'mist-mp-radio'));
    card.addEventListener('click', () => { if (select.value !== opt.value) pdSetNative(select, opt.value); modal._mistMpSig = ''; enhanceModpackInstallDialog(); });
    return card;
  }));
}

/* ---------- instance selection + home hero ---------- */
function mistActiveId() { try { return window.__mistApp?.getState().activeInstallationId || null; } catch { return null; } }
function mistSelectInstance(inst) {
  if (!inst) return;
  const store = window.__mistApp;
  if (store) store.getState().setActive(inst.id);
  else window.mist.installations.setActive(inst.id);
  showMistToast(`${inst.name} selected — press Play to launch`, 'ok');
}

function syncHomeHero(home) {
  home = home ? document.querySelector('.home-screen') : null;
  const grid = home && home.querySelector('.home-grid');
  if (!grid) return;
  let hero = document.getElementById('mist-home-hero');
  if (!hero) {
    hero = pdMk('section'); hero.id = 'mist-home-hero';
    hero.innerHTML = `<div class="mist-hh-glow"></div><div class="mist-hh-art"></div>
      <div class="mist-hh-copy"><span class="mist-hh-kicker"></span><h1></h1><p class="mist-hh-meta"></p>
      <div class="mist-hh-stats"><span><b data-k="last">–</b>last session</span></div></div>
      <div class="mist-hh-actions"><button type="button" class="mist-hh-play">${pdIcon('play', 18)}<span>Play</span></button>
      <div class="mist-hh-quick"><button type="button" data-go="instances">${pdIcon('install', 15)}Instances</button><button type="button" data-go="modpacks">${pdIcon('routeModpacks', 15)}Modpacks</button><button type="button" data-go="discord">${pdIcon('discord', 15)}Community</button></div></div>`;
    hero.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b) return;
      if (b.classList.contains('mist-hh-play')) { r8OpenInstancePicker(); return; }
      const go = b.dataset.go;
      if (go === 'instances') clickExisting(['.mist-browse-instances', '.bottom-navigation-item[aria-label="Installations"]']);
      else if (go === 'modpacks') location.hash = '#/modpacks';
      else if (go === 'discord') window.mist.app.openExternal('https://discord.gg/J9BzGzxt2r');
    });
    if (window.__mistApp && !window.__mistHeroSub) window.__mistHeroSub = window.__mistApp.subscribe((st, prev) => { if (st.activeInstallationId !== prev.activeInstallationId) { const h = document.querySelector('.home-screen'); if (h) syncHomeHero(h); } });
  }
  if (hero.parentElement !== grid || grid.firstElementChild !== hero) grid.insertBefore(hero, grid.firstChild);
  const hr = new Date().getHours();
  const greet = hr < 5 ? 'Late night session' : hr < 12 ? 'Good morning' : hr < 18 ? 'Good afternoon' : 'Good evening';
  pdInstallations().then(async (list) => {
    list = list || [];
    const active = list.find((i) => i.id === mistActiveId()) || [...list].sort((a, b) => (b.lastPlayed || 0) - (a.lastPlayed || 0))[0];
    const latest = list.reduce((m, i) => Math.max(m, i.lastPlayed ? new Date(i.lastPlayed).getTime() : 0), 0);
    let username = '';
    let skinUrl = '';
    try { const a = await window.mist.accounts.current(); username = a?.name || ''; skinUrl = a?.skinUrl || ''; } catch { username = ''; skinUrl = ''; }
    const sig = [greet, username, skinUrl, list.length, active?.id, active?.name, active?.gameVersion, latest].join('|');
    const heroArt = hero.querySelector('.mist-hh-art');
    if (hero._mistSig === sig && heroArt && (heroArt.childElementCount > 0 || heroArt.style.backgroundImage)) return;
    hero._mistSig = sig;
    hero.querySelector('.mist-hh-kicker').textContent = greet;
    hero.querySelector('h1').textContent = username || (active ? active.name : 'Player');
    const meta = hero.querySelector('.mist-hh-meta');
    if (meta) { meta.textContent = ''; meta.hidden = true; }
    hero.querySelector('[data-k=count]').textContent = String(list.length);
    hero.querySelector('[data-k=last]').textContent = latest ? timeAgoLabel(latest) : 'never';
    hero.querySelector('[data-k=loader]').textContent = active ? pdLoaderName(pdInstLoader(active)) : '–';
    hero.querySelector('.mist-hh-play span').textContent = 'Play';
    const art = hero.querySelector('.mist-hh-art'); art.replaceChildren();
    art.style.backgroundImage = '';
    art.style.backgroundSize = '';
    art.style.backgroundPosition = '';
    if (skinUrl) {
      art.style.backgroundImage = `url(${skinUrl})`;
      art.style.backgroundSize = '800% 800%';
      art.style.backgroundPosition = '14.28% 14.28%';
    } else {
      art.innerHTML = '<svg viewBox="0 0 8 8" preserveAspectRatio="none" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="8" height="8" fill="#b5835a"/><rect width="8" height="2" fill="#3a2a1a"/><rect x="0" y="2" width="1" height="2" fill="#3a2a1a"/><rect x="7" y="2" width="1" height="2" fill="#3a2a1a"/><rect x="1" y="3" width="2" height="1" fill="#f4f4f4"/><rect x="5" y="3" width="2" height="1" fill="#f4f4f4"/><rect x="2" y="3" width="1" height="1" fill="#3b2e8c"/><rect x="5" y="3" width="1" height="1" fill="#3b2e8c"/><rect x="3" y="4" width="2" height="1" fill="#9a6a48"/><rect x="2" y="5" width="4" height="1" fill="#6d4630"/><rect x="3" y="6" width="2" height="1" fill="#6d4630"/></svg>';
    }
  }).catch(() => {});
}


/* ================= R7: titlebar tools, favorites, theme, guide, splash, jobs HUD, launch overlay, server library ================= */
const R7I = {
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/></svg>',
  palette: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a10 10 0 1 1 10-10c0 2.8-2.2 4-4.5 4H16a2 2 0 0 0-1.4 3.4A1.5 1.5 0 0 1 13.5 22z"/><circle cx="7.5" cy="10.5" r="1.3"/><circle cx="12" cy="7" r="1.3"/><circle cx="16.5" cy="10.5" r="1.3"/></svg>',
  help: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  server: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="7" rx="2"/><rect x="3" y="13" width="18" height="7" rx="2"/><path d="M7 7.5h.01M7 16.5h.01"/></svg>',
  copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l13-7.5z"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
  stop: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>',
  dl: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m0 0-5-5m5 5 5-5M4 21h16"/></svg>'
};
const r7Esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
function r7Popover(id, title, anchor) {
  document.querySelectorAll('.mist-r7-pop').forEach((p) => { if (p.id !== id) p.hidden = true; });
  let pop = document.getElementById(id);
  if (!pop) {
    pop = document.createElement('section'); pop.id = id; pop.className = 'mist-r7-pop'; pop.hidden = true;
    pop.innerHTML = `<header><strong>${title}</strong><button type="button" class="mist-r7-x" aria-label="Close">${R7I.close}</button></header><div class="mist-r7-body"></div>`;
    pop.querySelector('.mist-r7-x').addEventListener('click', () => { pop.hidden = true; });
    document.body.appendChild(pop);
  }
  pop.hidden = !pop.hidden;
  if (!pop.hidden && anchor) {
    const r = anchor.getBoundingClientRect();
    pop.style.top = `${Math.round(r.bottom + 10)}px`;
    pop.style.right = `${Math.max(12, Math.round(window.innerWidth - r.right - 8))}px`;
  }
  return pop;
}
document.addEventListener('pointerdown', (e) => {
  if (e.target.closest('.mist-r7-pop, .mist-titlebar-tools')) return;
  document.querySelectorAll('.mist-r7-pop').forEach((p) => { p.hidden = true; });
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') document.querySelectorAll('.mist-r7-pop').forEach((p) => { p.hidden = true; }); });

/* ---------- titlebar tools ---------- */
function syncTitlebarTools() {
  const titlebar = document.querySelector('.titlebar');
  if (!titlebar || titlebar.querySelector('.mist-titlebar-tools')) return;
  const group = document.createElement('div'); group.className = 'mist-titlebar-tools';
  [['fav', 'Favorites', R7I.heart], ['theme', 'Customize theme', R7I.palette], ['guide', 'Launcher guide', R7I.help]].forEach(([key, label, icon]) => {
    const b = document.createElement('button'); b.type = 'button'; b.className = `mist-contact-button mist-tool-${key}`;
    b.title = label; b.setAttribute('aria-label', label); b.innerHTML = icon;
    b.addEventListener('click', () => { if (key === 'fav') openFavorites(b); else if (key === 'theme') openThemeStudio(b); else startGuide(true); });
    group.appendChild(b);
  });
  const contacts = titlebar.querySelector('.mist-titlebar-contacts');
  const utilities = titlebar.querySelector('.titlebar-utilities');
  const before = contacts || utilities;
  if (before && before.parentNode) before.parentNode.insertBefore(group, before); else titlebar.appendChild(group);
}

/* ---------- favorites ---------- */
function openFavorites(anchor) {
  const pop = r7Popover('mist-fav-panel', 'Your favorites', anchor);
  if (pop.hidden) return;
  const body = pop.querySelector('.mist-r7-body');
  const favs = Object.entries(pdFavs()).map(([key, v]) => ({ key, ...v })).sort((a, b) => (b.at || 0) - (a.at || 0));
  if (!favs.length) {
    body.innerHTML = `<div class="mist-r7-empty"><span>${R7I.heart}</span><strong>No favorites yet</strong><p>Open any modpack, mod, shader or pack and hit “Add to Favorites”.</p></div>`;
    return;
  }
  const types = ['all', ...new Set(favs.map((f) => f.type || 'project'))];
  body.innerHTML = `<div class="mist-fav-filters">${types.map((t, i) => `<button type="button" data-t="${r7Esc(t)}" class="${i ? '' : 'is-on'}">${t === 'all' ? `All <b>${favs.length}</b>` : r7Esc(t)}</button>`).join('')}</div><div class="mist-fav-list"></div>`;
  const list = body.querySelector('.mist-fav-list');
  const paint = (type) => {
    list.replaceChildren(...favs.filter((f) => type === 'all' || (f.type || 'project') === type).map((f) => {
      const row = document.createElement('div'); row.className = 'mist-fav-row';
      row.innerHTML = `<button type="button" class="mist-fav-open">${f.iconUrl ? `<img src="${r7Esc(f.iconUrl)}" alt="">` : `<span class="mist-fav-ph">${r7Esc((f.title || '?')[0])}</span>`}<span><strong>${r7Esc(f.title || 'Project')}</strong><small>${r7Esc(f.type || 'project')} · ${r7Esc(f.source || 'modrinth')}</small></span></button><button type="button" class="mist-fav-del" title="Remove" aria-label="Remove">${R7I.close}</button>`;
      row.querySelector('.mist-fav-open').addEventListener('click', () => {
        pop.hidden = true;
        if ((f.type || 'modpack') === 'modpack') location.hash = `#/modpacks?project=${encodeURIComponent(f.id)}&source=${encodeURIComponent(f.source || 'modrinth')}`;
        else openStandaloneProject({ id: f.id, source: f.source || 'modrinth', title: f.title, iconUrl: f.iconUrl }, f.type);
      });
      row.querySelector('.mist-fav-del').addEventListener('click', () => { pdToggleFav(f.key, f); const i = favs.indexOf(f); if (i >= 0) favs.splice(i, 1); row.remove(); if (!favs.length) { pop.hidden = true; openFavorites(anchor); } });
      return row;
    }));
  };
  body.querySelectorAll('.mist-fav-filters button').forEach((b) => b.addEventListener('click', () => { body.querySelectorAll('.mist-fav-filters button').forEach((x) => x.classList.toggle('is-on', x === b)); paint(b.dataset.t); }));
  paint('all');
}

/* ---------- theme studio ---------- */
const R7_ACCENTS = [['Frost', '#9fb8c8'], ['Amethyst', '#a882ff'], ['Lapis', '#5b8cff'], ['Diamond', '#3fd7d0'], ['Emerald', '#4ade80'], ['Gold', '#f7c948'], ['Ember', '#ff7a45'], ['Redstone', '#ff5c5c'], ['Sakura', '#ff7eb6']];
const R7_SURFACES = {
  midnight: { label: 'Midnight', bg: '#07090d', soft: '#0a0d13', panel: '#121219', tint: 'rgba(0,0,0,0)' },
  abyss: { label: 'OLED Abyss', bg: '#000000', soft: '#050505', panel: '#0b0b0d', tint: 'rgba(0,0,0,.35)' },
  slate: { label: 'Slate', bg: '#0e131b', soft: '#121a25', panel: '#172131', tint: 'rgba(40,70,120,.10)' },
  forest: { label: 'Forest', bg: '#08100c', soft: '#0c1611', panel: '#122019', tint: 'rgba(40,120,70,.10)' },
  dusk: { label: 'Dusk', bg: '#120b14', soft: '#170f1a', panel: '#1f1424', tint: 'rgba(140,60,150,.10)' },
  mocha: { label: 'Mocha', bg: '#100d0b', soft: '#16110e', panel: '#1f1813', tint: 'rgba(150,100,60,.10)' }
};
const r7Theme = () => { try { return { accent: '#9fb8c8', surface: 'midnight', glow: 1, radius: 'round', ...(JSON.parse(localStorage.getItem('mist-theme-v1') || '{}') || {}) }; } catch { return { accent: '#9fb8c8', surface: 'midnight', glow: 1, radius: 'round' }; } };
function r7Hex(hex) { const h = hex.replace('#', ''); const n = parseInt(h.length === 3 ? h.replace(/./g, '$&$&') : h, 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
function applyMistTheme(t = r7Theme()) {
  let style = document.getElementById('mist-theme-style');
  if (!style) { style = document.createElement('style'); style.id = 'mist-theme-style'; document.head.appendChild(style); }
  const s = R7_SURFACES[t.surface] || R7_SURFACES.midnight;
  const [r, g, b] = r7Hex(t.accent || '#9fb8c8');
  const contrast = (r * 299 + g * 587 + b * 114) / 1000 > 150 ? '#111318' : '#ffffff';
  const radius = t.radius === 'sharp' ? '6px' : t.radius === 'soft' ? '11px' : '16px';
  style.textContent = `:root{--accent:${t.accent}!important;--accent-secondary:color-mix(in srgb,${t.accent} 55%,#3fd7d0)!important;--accent-gradient:linear-gradient(135deg,${t.accent} 0%,color-mix(in srgb,${t.accent} 55%,#3fd7d0) 100%)!important;--accent-contrast:${contrast}!important;--accent-surface:color-mix(in srgb,${t.accent} 14%,transparent)!important;--accent-surface-raised:color-mix(in srgb,${t.accent} 22%,transparent)!important;--mist-accent-soft:color-mix(in srgb,${t.accent} 18%,transparent)!important;--pd-accent:${t.accent}!important;--bg:${s.bg}!important;--bg-soft:${s.soft}!important;--panel-2:${s.panel}!important;--panel:${s.panel}!important;--mist-panel:${s.panel}!important;--mist-panel-hover:color-mix(in srgb,${s.panel} 90%,${t.accent})!important;--mist-glow:${t.glow};--mist-radius:${radius}}
body{background-color:${s.bg}!important}
body::after{content:"";position:fixed;inset:0;pointer-events:none;z-index:1;background:radial-gradient(70% 60% at 85% 0%,rgba(${r},${g},${b},${0.10 * t.glow}),transparent 70%),${s.tint};mix-blend-mode:screen}
.app-body,.app-shell,main{background-color:transparent}
.home-screen #mist-home-hero,.mist-pd-card,.home-screen :is(.home-featured-sidebar,.home-hero-playtime-card,.home-server-dock,.home-changelog-card,.home-news-sidebar,#mist-recently-played),.settings-nav,.screen .panel,.version-table,.account-grid>*{border-radius:${radius}!important}`;
  document.documentElement.dataset.mistSurface = t.surface;
}
function saveMistTheme(patch) { const t = { ...r7Theme(), ...patch }; try { localStorage.setItem('mist-theme-v1', JSON.stringify(t)); } catch {} applyMistTheme(t); return t; }
function openThemeStudio(anchor) {
  const pop = r7Popover('mist-theme-panel', 'Theme studio', anchor);
  if (pop.hidden) return;
  const t = r7Theme();
  const fs = window.__mistApp?.getState().settings?.fontScale || 1;
  const body = pop.querySelector('.mist-r7-body');
  body.innerHTML = `
    <div class="mist-ts-preview"><span class="mist-ts-dot"></span><div><strong>Mist Launcher</strong><small>Live preview of your theme</small></div><button type="button" tabindex="-1">Play</button></div>
    <h4>Accent color</h4>
    <div class="mist-ts-swatches">${R7_ACCENTS.map(([n, c]) => `<button type="button" data-accent="${c}" title="${n}" style="--sw:${c}" class="${c.toLowerCase() === String(t.accent).toLowerCase() ? 'is-on' : ''}"></button>`).join('')}<label class="mist-ts-custom" title="Custom color"><input type="color" value="${t.accent}"><span>+</span></label></div>
    <h4>Background</h4>
    <div class="mist-ts-surfaces">${Object.entries(R7_SURFACES).map(([k, s]) => `<button type="button" data-surface="${k}" class="${k === t.surface ? 'is-on' : ''}" style="--sbg:${s.panel};--sbd:${s.bg}"><i></i>${s.label}</button>`).join('')}</div>
    <h4>Corners</h4>
    <div class="mist-ts-seg" data-k="radius">${[['sharp', 'Sharp'], ['soft', 'Soft'], ['round', 'Round']].map(([v, l]) => `<button type="button" data-v="${v}" class="${t.radius === v ? 'is-on' : ''}">${l}</button>`).join('')}</div>
    <h4>Glow</h4>
    <input class="mist-ts-range" type="range" min="0" max="2" step="0.25" value="${t.glow}">
    <h4>Text size</h4>
    <div class="mist-ts-seg" data-k="font">${[[0.9, 'Small'], [1, 'Default'], [1.1, 'Large']].map(([v, l]) => `<button type="button" data-v="${v}" class="${Math.abs(fs - v) < 0.01 ? 'is-on' : ''}">${l}</button>`).join('')}</div>
    <button type="button" class="mist-ts-reset">Reset to default</button>`;
  const mark = (sel, el) => body.querySelectorAll(sel).forEach((x) => x.classList.toggle('is-on', x === el));
  body.querySelectorAll('[data-accent]').forEach((b) => b.addEventListener('click', () => { saveMistTheme({ accent: b.dataset.accent }); mark('[data-accent]', b); }));
  body.querySelector('.mist-ts-custom input').addEventListener('input', (e) => { saveMistTheme({ accent: e.target.value }); mark('[data-accent]', null); });
  body.querySelectorAll('[data-surface]').forEach((b) => b.addEventListener('click', () => { saveMistTheme({ surface: b.dataset.surface }); mark('[data-surface]', b); }));
  body.querySelectorAll('[data-k=radius] button').forEach((b) => b.addEventListener('click', () => { saveMistTheme({ radius: b.dataset.v }); mark('[data-k=radius] button', b); }));
  body.querySelector('.mist-ts-range').addEventListener('input', (e) => saveMistTheme({ glow: Number(e.target.value) }));
  body.querySelectorAll('[data-k=font] button').forEach((b) => b.addEventListener('click', () => { mark('[data-k=font] button', b); const st = window.__mistApp?.getState(); if (st?.saveSettings) st.saveSettings({ fontScale: Number(b.dataset.v) }); }));
  body.querySelector('.mist-ts-reset').addEventListener('click', () => { try { localStorage.removeItem('mist-theme-v1'); } catch {} applyMistTheme(); pop.hidden = true; openThemeStudio(anchor); });
}

/* ---------- first-run guide ---------- */
const R7_GUIDE = [
  { title: 'Welcome to Mist Launcher', text: 'A fast, modern home for Minecraft: Java Edition — a 30-second tour of everything you need.', art: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l2.5 6.2L20.5 12l-6 2.8L12 21l-2.5-6.2L3.5 12l6-2.8z"/><path d="M19 3l.7 1.8L21.5 5.5l-1.8.7L19 8l-.7-1.8-1.8-.7 1.8-.7z"/></svg>' },
  { target: ['.app-sidebar', '.sidebar', '.bottom-navigation', 'nav.bottom-navigation'], title: 'Everything lives in the sidebar', text: 'Modpacks, Mods, Shaders, Resource Packs, Data Packs, Skins and Versions — one click away.', art: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="6" height="16" rx="2"/><rect x="12" y="4" width="9" height="7" rx="2"/><rect x="12" y="14" width="9" height="6" rx="2"/></svg>' },
  { target: ['.mist-hh-actions', '#mist-home-hero'], title: 'Your next session starts here', text: 'Browse Instances to choose your game, then press Play to launch the selected instance.', art: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m8 5 12 7-12 7z" fill="currentColor"/><path d="M5 3v18"/></svg>' },
  { target: ['#mist-home-hero'], title: 'Your home dashboard', text: 'See your active instance, recently played worlds, servers, playtime and the latest news.', art: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m2 10 10-7 10 7"/><path d="M5 10v9h14v-9"/><path d="M12 15v4"/></svg>' },
  { target: ['.mist-titlebar-tools'], title: 'Make it yours', text: 'Open Favorites to find saved packs, change the whole theme with the palette, and replay this guide with “?”.', art: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20s-7-4.4-9.5-9.5A5.4 5.4 0 0 1 12 5.3a5.4 5.4 0 0 1 9.5 5.2C19 15.6 12 20 12 20z"/></svg>' },
  { title: 'You are all set!', text: 'Install a modpack or create a vanilla instance to start playing. Have fun!', art: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.5 2.5 4.5-5"/></svg>', last: true }
];
function startGuide(force) {
  if (!force) {
    try { if (localStorage.getItem('mist-guide-seen') === '1') return; localStorage.setItem('mist-guide-seen', '1'); } catch {}
  }
  document.getElementById('mist-guide')?.remove();
  const g = document.createElement('div'); g.id = 'mist-guide';
  g.innerHTML = '<div class="mist-guide-spot"></div><div class="mist-guide-card" role="dialog" aria-modal="true" aria-label="Launcher guide"><button type="button" class="mist-guide-skip">Skip tour</button><div class="mist-guide-art"></div><span class="mist-guide-step"></span><h2></h2><p></p><div class="mist-guide-dots"></div><div class="mist-guide-nav"><button type="button" class="mist-guide-back">Back</button><button type="button" class="mist-guide-next"><span class="mist-guide-next-label">Next</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg></button></div><div class="mist-guide-hint">← → navigate · Esc close</div></div>';
  document.body.appendChild(g);
  let i = 0;
  const done = () => {
    try { localStorage.setItem('mist-guide-done', '1'); localStorage.setItem('mist-guide-seen', '1'); } catch {}
    window.removeEventListener('keydown', onKey, true);
    g.classList.add('is-leaving');
    setTimeout(() => g.remove(), 240);
    window.removeEventListener('resize', paint);
  };
  const onKey = (e) => {
    if (e.key === 'Escape') { e.stopPropagation(); done(); }
    else if (e.key === 'ArrowRight') { e.stopPropagation(); nextBtn.click(); }
    else if (e.key === 'ArrowLeft') { e.stopPropagation(); if (i > 0) backBtn.click(); }
  };
  const nextBtn = g.querySelector('.mist-guide-next');
  const backBtn = g.querySelector('.mist-guide-back');
  const paint = () => {
    const s = R7_GUIDE[i];
    g.querySelector('.mist-guide-art').innerHTML = s.art;
    g.querySelector('.mist-guide-step').textContent = `Step ${i + 1} of ${R7_GUIDE.length}`;
    g.querySelector('h2').textContent = s.title; g.querySelector('p').textContent = s.text;
    g.querySelector('.mist-guide-dots').innerHTML = R7_GUIDE.map((_, k) => `<i class="${k === i ? 'is-on' : ''}"></i>`).join('');
    g.querySelector('.mist-guide-back').hidden = i === 0;
    g.querySelector('.mist-guide-next-label').textContent = s.last ? 'Start playing' : 'Continue';
    const el = (s.target || []).map((sel) => document.querySelector(sel)).find((e) => e && e.getBoundingClientRect().width > 0);
    const spot = g.querySelector('.mist-guide-spot'); const card = g.querySelector('.mist-guide-card');
    g.classList.toggle('has-spot', Boolean(el));
    if (el) {
      const r = el.getBoundingClientRect(); const pad = 8;
      Object.assign(spot.style, { left: `${r.left - pad}px`, top: `${r.top - pad}px`, width: `${r.width + pad * 2}px`, height: `${r.height + pad * 2}px` });
      const cw = 360, ch = 300;
      let left = r.right + 24, top = r.top;
      if (left + cw > innerWidth - 16) left = Math.max(16, r.left - cw - 24);
      if (left < 16 || r.width > innerWidth * 0.5) { left = Math.min(innerWidth - cw - 16, Math.max(16, r.left + r.width / 2 - cw / 2)); top = r.bottom + 20 + ch > innerHeight ? r.top - ch - 20 : r.bottom + 20; }
      Object.assign(card.style, { left: `${Math.round(left)}px`, top: `${Math.round(Math.min(Math.max(16, top), innerHeight - ch - 16))}px`, transform: 'none' });
    } else Object.assign(card.style, { left: '50%', top: '50%', transform: 'translate(-50%,-50%)' });
    card.classList.remove('is-pop'); void card.offsetWidth; card.classList.add('is-pop');
  };
  g.querySelector('.mist-guide-skip').addEventListener('click', done);
  g.querySelector('.mist-guide-back').addEventListener('click', () => { i = Math.max(0, i - 1); paint(); });
  g.querySelector('.mist-guide-next').addEventListener('click', () => { if (R7_GUIDE[i].last) done(); else { i += 1; paint(); } });
  window.addEventListener('keydown', onKey, true);
  window.addEventListener('resize', paint);
  paint();
}

/* ---------- splash ---------- */
(function mistSplash() {
  if (document.getElementById('mist-splash')) return;
  const sp = document.createElement('div'); sp.id = 'mist-splash';
  sp.innerHTML = '<div class="mist-splash-core"><div class="mist-splash-ring"></div><div class="mist-splash-ring r2"></div><img src="./assets/mist-logo-DWC6NdSO.png" alt=""></div><strong>Mist Launcher</strong><div class="mist-splash-bar"><i></i></div><small>Warming up the blocks…</small>';
  (document.body || document.documentElement).appendChild(sp);
  const tips = ['Warming up the blocks…', 'Loading your instances…', 'Polishing diamonds…', 'Almost there…'];
  let k = 0; const tip = setInterval(() => { k = (k + 1) % tips.length; const s = sp.querySelector('small'); if (s) s.textContent = tips[k]; }, 650);
  const t0 = performance.now();
  const check = () => {
    const ready = document.querySelector('.screen, .home-screen');
    const el = performance.now() - t0;
    if ((ready && el > 1300) || el > 6000) {
      clearInterval(tip); sp.classList.add('is-leaving');
      setTimeout(() => { sp.remove(); setTimeout(() => startGuide(false), 500); }, 520);
    } else setTimeout(check, 120);
  };
  setTimeout(check, 120);
})();

/* ---------- download HUD (jobs) ---------- */
const r7Bytes = (n) => { if (!n) return '0 B'; const u = ['B', 'KB', 'MB', 'GB']; let i = 0; while (n >= 1024 && i < 3) { n /= 1024; i += 1; } return `${n.toFixed(i ? 1 : 0)} ${u[i]}`; };
let r7HudDismissed = new Set(); let r7HudDoneT = 0; let r7HudSeen = new Set();
function paintJobsHud(jobs) {
  let hud = document.getElementById('mist-dl-hud');
  const active = (jobs || []).filter((j) => j.status === 'running' || j.status === 'queued');
  active.forEach((j) => r7HudSeen.add(j.id));
  const visible = active.filter((j) => !r7HudDismissed.has(j.id));
  if (!hud) {
    hud = document.createElement('aside'); hud.id = 'mist-dl-hud'; hud.hidden = true;
    hud.innerHTML = `<header><span class="mist-dl-cube"><i></i><i></i><i></i></span><div><strong>Downloading</strong><small></small></div><button type="button" class="mist-r7-x" aria-label="Hide downloads">${R7I.close}</button></header><div class="mist-dl-list"></div>`;
    hud.querySelector('.mist-r7-x').addEventListener('click', () => { (hud._jobs || []).forEach((j) => r7HudDismissed.add(j.id)); hud.hidden = true; });
    document.body.appendChild(hud);
  }
  hud._jobs = visible;
  if (!visible.length) {
    const finished = (jobs || []).some((j) => r7HudSeen.has(j.id) && j.status === 'done');
    if (!hud.hidden && finished && !hud.classList.contains('is-done')) {
      hud.classList.add('is-done'); hud.querySelector('strong').textContent = 'Download complete';
      hud.querySelector('small').textContent = 'Everything is ready to play';
      hud.querySelector('.mist-dl-list').innerHTML = `<div class="mist-dl-check">${R7I.check}</div>`;
      clearTimeout(r7HudDoneT); r7HudDoneT = setTimeout(() => { hud.hidden = true; hud.classList.remove('is-done'); r7HudSeen = new Set(); }, 2600);
    } else if (!hud.classList.contains('is-done')) hud.hidden = true;
    return;
  }
  clearTimeout(r7HudDoneT); hud.classList.remove('is-done'); hud.hidden = false;
  hud.querySelector('strong').textContent = visible.length > 1 ? `Downloading ${visible.length} items` : 'Downloading';
  hud.querySelector('small').textContent = visible[0].phase || 'Preparing…';
  hud.querySelector('.mist-dl-list').innerHTML = visible.slice(0, 4).map((j) => {
    const pct = j.totalBytes > 0 ? Math.min(100, Math.round((j.doneBytes / j.totalBytes) * 100)) : null;
    return `<div class="mist-dl-row"><div class="mist-dl-top"><span>${r7Esc(j.title || 'Download')}</span><b>${pct == null ? (j.status === 'queued' ? 'Queued' : '…') : `${pct}%`}</b></div><div class="mist-dl-bar ${pct == null ? 'is-indet' : ''}"><i style="width:${pct == null ? 35 : pct}%"></i></div><small>${r7Esc(j.phase || '')}${j.totalBytes ? ` · ${r7Bytes(j.doneBytes)} / ${r7Bytes(j.totalBytes)}` : ''}</small></div>`;
  }).join('');
}

/* ---------- launch / playing overlay ---------- */
const r7Launch = { id: null, name: '', state: 'idle', started: 0, timer: 0, failT: 0, collapsed: false };
function r7LaunchEl() {
  let ov = document.getElementById('mist-launch');
  if (ov) return ov;
  ov = document.createElement('div'); ov.id = 'mist-launch'; ov.hidden = true;
  ov.innerHTML = `<div class="mist-launch-card"><button type="button" class="mist-launch-close" aria-label="Close">${R7I.close}</button>
    <div class="mist-launch-scene"><div class="mist-launch-block"><i class="f1"></i><i class="f2"></i><i class="f3"></i></div><div class="mist-launch-orbit"></div><div class="mist-launch-pulse"></div></div>
    <span class="mist-launch-kicker"></span><h2></h2><p></p><div class="mist-launch-bar"><i></i></div>
    <div class="mist-launch-actions"><button type="button" class="mist-launch-min">Hide</button><button type="button" class="mist-launch-stop">${R7I.stop}<span>Stop game</span></button></div></div>`;
  const hide = () => { r7Launch.collapsed = true; ov.hidden = true; paintLaunchPill(); };
  ov.querySelector('.mist-launch-close').addEventListener('click', hide);
  ov.querySelector('.mist-launch-min').addEventListener('click', hide);
  ov.querySelector('.mist-launch-stop').addEventListener('click', () => { if (r7Launch.id) window.mist.launch.kill(r7Launch.id).catch(() => {}); });
  document.body.appendChild(ov);
  return ov;
}
function paintLaunchPill() {
  let pill = document.getElementById('mist-play-pill');
  const show = r7Launch.state === 'running' && r7Launch.collapsed;
  if (!pill) {
    pill = document.createElement('div'); pill.id = 'mist-play-pill'; pill.hidden = true;
    pill.innerHTML = `<span class="mist-pill-dot"></span><button type="button" class="mist-pill-open"><strong></strong><small></small></button><button type="button" class="mist-pill-stop" title="Stop game">${R7I.stop}</button><button type="button" class="mist-pill-x" title="Dismiss">${R7I.close}</button>`;
    pill.querySelector('.mist-pill-open').addEventListener('click', () => { r7Launch.collapsed = false; paintLaunch(); });
    pill.querySelector('.mist-pill-stop').addEventListener('click', () => { if (r7Launch.id) window.mist.launch.kill(r7Launch.id).catch(() => {}); });
    pill.querySelector('.mist-pill-x').addEventListener('click', () => { pill.hidden = true; pill.dataset.dismissed = r7Launch.id || ''; });
    document.body.appendChild(pill);
  }
  pill.hidden = !show || pill.dataset.dismissed === r7Launch.id;
  if (!pill.hidden) {
    pill.querySelector('strong').textContent = `Playing ${r7Launch.name || 'Minecraft'}`;
    const s = Math.max(0, Math.floor((Date.now() - r7Launch.started) / 1000));
    pill.querySelector('small').textContent = `${Math.floor(s / 3600) ? `${Math.floor(s / 3600)}h ` : ''}${String(Math.floor(s / 60) % 60).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  }
}
function paintLaunch() {
  const ov = r7LaunchEl();
  if (r7Launch.state === 'idle') { ov.hidden = true; paintLaunchPill(); return; }
  ov.hidden = r7Launch.collapsed;
  ov.dataset.state = r7Launch.state;
  const run = r7Launch.state === 'running';
  ov.querySelector('.mist-launch-kicker').textContent = run ? 'Now playing' : 'Launching';
  ov.querySelector('h2').textContent = r7Launch.name || 'Minecraft';
  if (run) {
    const s = Math.max(0, Math.floor((Date.now() - r7Launch.started) / 1000));
    ov.querySelector('p').textContent = `Minecraft is running · ${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')} this session`;
  } else {
    const steps = ['Checking game files…', 'Preparing Java runtime…', 'Loading libraries & assets…', 'Starting Minecraft…'];
    ov.querySelector('p').textContent = steps[Math.min(steps.length - 1, Math.floor((Date.now() - r7Launch.t0) / 1800))];
  }
  ov.querySelector('.mist-launch-stop').hidden = !run;
  paintLaunchPill();
}
function r7LaunchTick() {
  clearInterval(r7Launch.timer);
  r7Launch.timer = setInterval(() => { if (r7Launch.state === 'idle') clearInterval(r7Launch.timer); else paintLaunch(); }, 1000);
}
function r7BeginLaunch(name, id) {
  if (r7Launch.state === 'running' && id && r7Launch.id === id) return;
  Object.assign(r7Launch, { state: 'launching', name: name || r7Launch.name, id: id || mistActiveId(), t0: Date.now(), collapsed: false });
  const pill = document.getElementById('mist-play-pill'); if (pill) pill.dataset.dismissed = '';
  clearTimeout(r7Launch.failT);
  r7Launch.failT = setTimeout(() => { if (r7Launch.state === 'launching') { r7Launch.state = 'idle'; paintLaunch(); } }, 90000);
  paintLaunch(); r7LaunchTick();
}
function r7OnGameState(s) {
  if (!s) return;
  if (s.running) {
    const known = (pdInstCache.list || []).find((i) => i.id === s.installationId);
    Object.assign(r7Launch, { state: 'running', id: s.installationId, name: known?.name || r7Launch.name, started: s.startedAt ? new Date(s.startedAt).getTime() : Date.now() });
    clearTimeout(r7Launch.failT);
    if (!r7Launch.collapsed) setTimeout(() => { if (r7Launch.state === 'running' && !r7Launch.collapsed) { r7Launch.collapsed = true; paintLaunch(); } }, 6000);
    paintLaunch(); r7LaunchTick();
  } else if (!s.installationId || s.installationId === r7Launch.id) {
    r7Launch.state = 'idle'; paintLaunch();
  }
}

/* ---------- server library ---------- */
const R7_SERVERS = [
  ['Hypixel', 'mc.hypixel.net', 'Minigames', 'SkyBlock, BedWars, SkyWars, Murder Mystery and more.'],
  ['CubeCraft Games', 'play.cubecraft.net', 'Minigames', 'EggWars, SkyWars, Parkour and seasonal events.'],
  ['Wynncraft', 'play.wynncraft.com', 'RPG', 'The biggest Minecraft MMORPG with quests, dungeons and raids.'],
  ['2b2t', '2b2t.org', 'Anarchy', 'The oldest anarchy server. No rules, no resets.'],
  ['Minehut', 'minehut.com', 'Hub', 'Thousands of player-made servers in one lobby.'],
  ['ManaCube', 'play.manacube.com', 'Skyblock', 'Skyblock, Parkour, Survival and Prison.'],
  ['Complex Gaming', 'hub.mc-complex.com', 'Pixelmon', 'Pixelmon, Towny, Factions, Skyblock.'],
  ['Jartex Network', 'play.jartexnetwork.com', 'Minigames', 'BedWars, SkyWars, Practice and Survival.'],
  ['PikaNetwork', 'play.pika-network.net', 'Minigames', 'BedWars, Skyblock, Practice, OP Factions.'],
  ['BlocksMC', 'blocksmc.com', 'Minigames', 'Cracked-friendly BedWars and SkyWars.'],
  ['MCCentral', 'mccentral.org', 'Skyblock', 'Skyblock, Prison, Survival and Creative.'],
  ['Purple Prison', 'purpleprison.net', 'Prison', 'Classic prison with gangs and events.'],
  ['Lemon Cloud', 'lemoncloud.net', 'Survival', 'Survival, Skyblock and Creative plots.'],
  ['Origin Realms', 'originrealms.com', 'RPG', 'Fully custom MMO with bespoke models.'],
  ['Minemen Club', 'minemen.club', 'PvP', 'Competitive practice PvP and ranked queues.'],
  ['Hoplite', 'hoplite.gg', 'Battle Royale', 'Fast-paced battle royale with classes.'],
  ['Mineberry', 'mineberry.org', 'Minigames', 'Cracked-friendly minigames network.'],
  ['OPBlocks', 'opblocks.com', 'Skyblock', 'OP Skyblock, Prison and Survival.'],
  ['Skyblock.net', 'skyblock.net', 'Skyblock', 'The original Skyblock server.'],
  ['Herobrine.org', 'herobrine.org', 'Minigames', 'BedWars, Survival, Skyblock.'],
  ['GommeHD', 'gommehd.net', 'Minigames', 'Germany\'s largest minigame network.'],
  ['GrieferGames', 'griefergames.net', 'Survival', 'German citybuild and survival.'],
  ['Rewinside', 'rewinside.tv', 'Minigames', 'German minigames network.'],
  ['FunCraft', 'play.funcraft.net', 'Minigames', 'French minigames network.'],
  ['Universocraft', 'mc.universocraft.com', 'Minigames', 'Spanish-speaking minigames.'],
  ['MoxMC', 'moxmc.net', 'Survival', 'Survival, Skyblock and Prison.'],
  ['Vulengate', 'vulengate.com', 'Survival', 'Survival with custom enchants.'],
  ['FadeCloud', 'play.fadecloud.com', 'Survival', 'Survival, Skyblock, Factions.'],
  ['Grand Theft Minecart', 'mc.gtm.network', 'Roleplay', 'GTA-style city roleplay.'],
  ['EarthMC', 'play.earthmc.net', 'Towny', 'Build nations on a 1:1000 Earth map.'],
  ['CivMC', 'play.civmc.net', 'Civilization', 'Player-run civilizations and diplomacy.'],
  ['DiamondFire', 'mcdiamondfire.com', 'Creative', 'Code your own games with blocks.'],
  ['Build The Earth', 'buildtheearth.net', 'Creative', 'Recreating Earth 1:1 in Minecraft.'],
  ['Constantiam', 'constantiam.net', 'Anarchy', 'Long-running anarchy server.'],
  ['9b9t', '9b9t.com', 'Anarchy', 'Anarchy with 2b2t-style vibes.'],
  ['Minewind', 'server.minewind.com', 'Survival', 'Hardcore PvP survival.'],
  ['Kaboom', 'kaboom.pw', 'Creative', 'Everyone is OP — total chaos.'],
  ['Lunar Network', 'lunar.gg', 'PvP', 'Practice, Kit PvP and events.'],
  ['PvP Land', 'pvp.land', 'PvP', 'Practice PvP with ranked ladders.'],
  ['Bedwars Practice', 'bedwarspractice.club', 'PvP', 'Train bridging, clutches and fights.'],
  ['AkumaMC', 'akumamc.net', 'Factions', 'Factions, Prison and Skyblock.'],
  ['MineSuperior', 'play.minesuperior.com', 'Survival', 'Survival, Skyblock and Prison.'],
  ['ExtremeCraft', 'play.extremecraft.net', 'Minigames', 'Survival games and minigames.'],
  ['InsanityCraft', 'play.insanitycraft.net', 'Survival', 'Survival, Skyblock and events.'],
  ['Wild Prison', 'wildprison.net', 'Prison', 'Prison with custom mines.'],
  ['Advancius', 'play.advancius.net', 'Survival', 'Friendly community survival.'],
  ['DatBlock', 'datblock.com', 'Survival', 'Survival, Skyblock and Creative.'],
  ['Loverfella', 'mc.loverfella.com', 'Survival', 'Survival, Skyblock and minigames.']
];
const r7Ping = new Map(); let r7PingQ = []; let r7PingActive = 0;
function r7QueuePing(addr, cb) {
  if (r7Ping.has(addr)) { const v = r7Ping.get(addr); if (v && !v.then) { cb(v); return; } }
  r7PingQ.push([addr, cb]); r7PumpPing();
}
function r7PumpPing() {
  while (r7PingActive < 4 && r7PingQ.length) {
    const [addr, cb] = r7PingQ.shift(); r7PingActive += 1;
    fetch(`https://api.mcsrvstat.us/3/${encodeURIComponent(addr)}`, { signal: AbortSignal.timeout(10000) }).then((r) => r.json()).catch(() => ({ online: false }))
      .then((d) => { r7Ping.set(addr, d); cb(d); }).finally(() => { r7PingActive -= 1; r7PumpPing(); });
  }
}
async function openServerLibrary() {
  closeServerLibrary();
  const ov = document.createElement('div'); ov.id = 'mist-srvlib';
  ov.innerHTML = `<div class="mist-srvlib-backdrop"></div><section class="mist-srvlib-card" role="dialog" aria-label="Server library">
    <header><div class="mist-srvlib-title"><span>${R7I.server}</span><div><h2>Server library</h2><small class="mist-srvlib-count">Loading servers…</small></div></div><button type="button" class="mist-r7-x" aria-label="Close">${R7I.close}</button></header>
    <div class="mist-srvlib-tools"><label class="mist-srvlib-search"><input type="search" placeholder="Search by name, IP or game mode…" aria-label="Search servers"></label><div class="mist-srvlib-cats"></div></div>
    <div class="mist-srvlib-grid"></div></section>`;
  document.body.appendChild(ov);
  const close = () => closeServerLibrary();
  ov.querySelector('.mist-srvlib-backdrop').addEventListener('click', close);
  ov.querySelector('.mist-r7-x').addEventListener('click', close);
  ov._keys = (e) => { if (e.key === 'Escape') close(); }; document.addEventListener('keydown', ov._keys);
  let all = R7_SERVERS.map(([name, address, cat, desc]) => ({ name, address, cat, desc }));
  const seen = new Set(all.map((s) => s.address.toLowerCase()));
  try {
    for (let page = 1; page <= 6; page += 1) {
      const res = await window.mist.servers.list({ search: '', filter: 'all', sort: 'popular', page });
      const items = res?.servers || res?.items || res?.results || [];
      items.forEach((s) => { const a = String(s.address || s.ip || '').toLowerCase(); if (!a || seen.has(a)) return; seen.add(a); all.push({ name: s.name || a, address: a, port: s.port, cat: (s.tags && s.tags[0]) || 'Community', desc: s.description || s.motd || '' }); });
      if (!items.length || (res.pages && page >= res.pages) || (res.totalPages && page >= res.totalPages) || res.hasMore === false) break;
    }
  } catch {}
  if (!document.body.contains(ov)) return;
  const cats = ['All', ...[...new Set(all.map((s) => s.cat))].sort()];
  let cat = 'All'; let q = '';
  const catsEl = ov.querySelector('.mist-srvlib-cats');
  catsEl.innerHTML = cats.map((c) => `<button type="button" data-c="${r7Esc(c)}" class="${c === 'All' ? 'is-on' : ''}">${r7Esc(c)}</button>`).join('');
  const grid = ov.querySelector('.mist-srvlib-grid');
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (!en.isIntersecting) return; io.unobserve(en.target);
    const card = en.target;
    r7QueuePing(card.dataset.addr, (d) => {
      card.classList.add(d.online ? 'is-online' : 'is-offline');
      card.querySelector('.mist-sv-status').textContent = d.online ? `${(d.players?.online ?? 0).toLocaleString()} online` : 'Offline';
      if (d.icon) card.querySelector('.mist-sv-icon').innerHTML = `<img src="${r7Esc(d.icon)}" alt="">`;
      if (d.version) card.querySelector('.mist-sv-ver').textContent = String(d.version).slice(0, 28);
    });
  }), { root: grid, rootMargin: '200px' });
  ov._io = io;
  const paint = () => {
    io.disconnect();
    const list = all.filter((s) => (cat === 'All' || s.cat === cat) && (!q || `${s.name} ${s.address} ${s.cat} ${s.desc}`.toLowerCase().includes(q)));
    ov.querySelector('.mist-srvlib-count').textContent = `${list.length} of ${all.length} servers`;
    if (!list.length) { grid.innerHTML = '<p class="mist-srvlib-empty">No servers match your search.</p>'; return; }
    grid.replaceChildren(...list.map((s) => {
      const c = document.createElement('article'); c.className = 'mist-sv-card'; c.dataset.addr = s.address;
      c.innerHTML = `<div class="mist-sv-head"><span class="mist-sv-icon">${r7Esc(s.name[0] || '?')}</span><div><strong>${r7Esc(s.name)}</strong><code>${r7Esc(s.address)}</code></div><span class="mist-sv-status">Pinging…</span></div><p>${r7Esc(s.desc || 'Community server')}</p><div class="mist-sv-foot"><span class="mist-sv-tag">${r7Esc(s.cat)}</span><span class="mist-sv-ver"></span><button type="button" class="mist-sv-copy" title="Copy IP">${R7I.copy}</button><button type="button" class="mist-sv-play">${R7I.play}<span>Play</span></button></div>`;
      c.querySelector('.mist-sv-copy').addEventListener('click', () => { window.mist.app.copyToClipboard(s.address); showMistToast(`Copied ${s.address}`, 'ok'); });
      c.querySelector('.mist-sv-play').addEventListener('click', async () => {
        const id = mistActiveId() || (await pdInstallations())?.[0]?.id;
        if (!id) { showMistToast('Create an instance first', ''); return; }
        const inst = (pdInstCache.list || []).find((i) => i.id === id);
        closeServerLibrary(); r7BeginLaunch(inst?.name || s.name, id);
        try { const r = await window.mist.launch.play(id, { name: s.name, address: s.address, port: s.port || 25565 }); if (!r?.ok) { r7Launch.state = 'idle'; paintLaunch(); showMistToast(r?.error || 'Minecraft did not start', ''); } } catch (e) { r7Launch.state = 'idle'; paintLaunch(); showMistToast(String(e?.message || e), ''); }
      });
      io.observe(c);
      return c;
    }));
  };
  catsEl.addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; cat = b.dataset.c; catsEl.querySelectorAll('button').forEach((x) => x.classList.toggle('is-on', x === b)); paint(); });
  let st = 0; ov.querySelector('input').addEventListener('input', (e) => { clearTimeout(st); st = setTimeout(() => { q = e.target.value.trim().toLowerCase(); paint(); }, 120); });
  paint();
  ov.querySelector('input').focus();
}
function closeServerLibrary() {
  const ov = document.getElementById('mist-srvlib'); if (!ov) return;
  ov._io?.disconnect(); document.removeEventListener('keydown', ov._keys); ov.remove();
}

/* ---------- per-sync hooks ---------- */
function syncR7(home) {
  home = home ? document.querySelector('.home-screen') : null;
  syncTitlebarTools();
  const dock = home && home.querySelector('.home-server-dock');
  if (dock && !dock.querySelector('.mist-srvlib-open')) {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'mist-srvlib-open';
    b.innerHTML = `${R7I.server}<span>Server library</span>`; b.addEventListener('click', openServerLibrary);
    dock.appendChild(b);
  }
  const hero = document.getElementById('mist-home-hero');
  const quick = hero && hero.querySelector('.mist-hh-quick');
  if (quick && !quick.querySelector('[data-go=servers]')) {
    const b = document.createElement('button'); b.type = 'button'; b.dataset.go = 'servers'; b.innerHTML = `${R7I.server}Servers`;
    b.addEventListener('click', (e) => { e.stopPropagation(); openServerLibrary(); });
    quick.insertBefore(b, quick.lastElementChild);
  }
}

function mistR7Init() {
  applyMistTheme();
  /* single download UI: built-in React JobDock */
  try { window.mist.events.gameState((s) => r7OnGameState(s)); } catch {}
  window.addEventListener('mist:game-starting', (e) => r7BeginLaunch(e.detail?.name, e.detail?.installationId));
  window.addEventListener('mist:game-start-finished', (e) => {
    if (!e.detail?.ok && r7Launch.state === 'launching') { clearTimeout(r7Launch.failT); r7Launch.state = 'idle'; paintLaunch(); }
  });
  pdInstallations().catch(() => {});
  try { window.mist.launch.running().then((list) => (list || []).forEach((s) => { if (s.running) { r7Launch.collapsed = true; r7OnGameState(s); } })).catch(() => {}); } catch {}
}
setTimeout(mistR7Init, 0);


/* ================= R8: generated instance icons, home spotlight, recent tiles, hero ambience ================= */
const R8_PALETTE = {
  vanilla: { top: '#78c251', top2: '#5ea83c', lip: ['#5c9e3a', '#4b8730'], left: '#8b5a3c', right: '#6b442c', glow: '#5fb04a' },
  fabric: { top: '#ebe1c6', top2: '#d4c7a5', lip: null, left: '#c4b38c', right: '#9f8f69', glow: '#d8c79a' },
  forge: { top: '#5f6576', top2: '#4b505e', lip: ['#e0662b', '#b9501f'], left: '#3e4350', right: '#2c3039', glow: '#e0662b' },
  neoforge: { top: '#f39b4b', top2: '#e2843a', lip: ['#3b2a20', '#2e2018'], left: '#d47a2c', right: '#ad5f1f', glow: '#f08a3c' },
  quilt: { top: '#b88de9', top2: '#a275dc', lip: ['#6d3fb3', '#5a3396'], left: '#8e62cc', right: '#6f48aa', glow: '#a97be6' },
};
function r8Hash(s) { let h = 2166136261; for (const c of String(s)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }
function mistGenIcon(inst) {
  const loader = String(inst?.loader?.type || 'vanilla').toLowerCase();
  const p = R8_PALETTE[loader] || R8_PALETTE.vanilla;
  let seed = r8Hash(inst?.id || inst?.name || 'mist') || 7;
  const rnd = () => { seed = (Math.imul(seed, 1103515245) + 12345) >>> 0; return seed / 4294967296; };
  const pt = ([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`;
  const T = (u, v) => [32 + (u - v) * 6, 8 + (u + v) * 3];
  const L = (a, b) => [8 + a * 6, 20 + a * 3 + b * 6.5];
  const R = (a, b) => [56 - a * 6, 20 + a * 3 + b * 6.5];
  const cell = (f, a, b) => [f(a, b), f(a + 1, b), f(a + 1, b + 1), f(a, b + 1)].map(pt).join(' ');
  const quad = (f, a0, b0, a1, b1) => [f(a0, b0), f(a1, b0), f(a1, b1), f(a0, b1)].map(pt).join(' ');
  let px = '';
  for (let u = 0; u < 4; u += 1) for (let v = 0; v < 4; v += 1) if (rnd() < 0.45) px += `<polygon points="${cell(T, u, v)}" fill="${rnd() < 0.62 ? p.top2 : '#ffffff'}" opacity="${rnd() < 0.62 ? 0.95 : 0.14}"/>`;
  [[L, 0], [R, 1]].forEach(([f, side]) => {
    for (let a = 0; a < 4; a += 1) for (let b = p.lip ? 1 : 0; b < 4; b += 1) if (rnd() < 0.36) px += `<polygon points="${cell(f, a, b)}" fill="${rnd() < 0.6 ? '#000' : '#fff'}" opacity="${rnd() < 0.6 ? 0.17 : 0.08}"/>`;
    if (p.lip) {
      px += `<polygon points="${quad(f, 0, 0, 4, 1)}" fill="${p.lip[side]}"/>`;
      for (let a = 0; a < 4; a += 1) if (rnd() < 0.45) px += `<polygon points="${quad(f, a, 1, a + 1, 1.5)}" fill="${p.lip[side]}"/>`;
    }
  });
  const ver = String(inst?.gameVersion || '');
  const badge = /snapshot|-rc|-pre|^\d\dw\d/i.test(ver)
    ? '<circle cx="53" cy="11" r="7.5" fill="#f5c542" stroke="#15161b" stroke-width="2"/><path d="M53 6.6l1.35 2.75 3.05.45-2.2 2.15.52 3.03L53 13.55l-2.72 1.43.52-3.03-2.2-2.15 3.05-.45z" fill="#15161b"/>'
    : '';
  return `<svg class="mist-gen-svg" viewBox="0 0 64 64" aria-hidden="true"><ellipse cx="32" cy="58.5" rx="19" ry="3.6" fill="#000" opacity=".38"/>`
    + `<polygon points="${[T(0, 0), T(4, 0), T(4, 4), T(0, 4)].map(pt).join(' ')}" fill="${p.top}"/>`
    + `<polygon points="${quad(L, 0, 0, 4, 4)}" fill="${p.left}"/><polygon points="${quad(R, 0, 0, 4, 4)}" fill="${p.right}"/>${px}`
    + `<polyline points="8,20 32,8 56,20" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width=".9"/><line x1="32" y1="32" x2="32" y2="58" stroke="#000" stroke-opacity=".22" stroke-width=".8"/>${badge}</svg>`;
}
function mistDecorateGen(art, inst) {
  const loader = String(inst?.loader?.type || 'vanilla').toLowerCase();
  const p = R8_PALETTE[loader] || R8_PALETTE.vanilla;
  art.classList.add('mist-gen-icon'); art.classList.remove('is-letter', 'is-fallback');
  art.style.removeProperty('background');
  art.style.setProperty('--ig', p.glow); art.style.setProperty('--ih', String(r8Hash(inst?.id || inst?.name || '') % 360));
  art.innerHTML = mistGenIcon(inst);
  return art;
}

window.__mistInstanceArt = (icon, name, gameVersion) => {
  const type = icon === 'grass' ? 'vanilla' : icon;
  const inst = { name, gameVersion, loader: { type } };
  return { html: mistGenIcon(inst), style: { '--ig': (R8_PALETTE[type] || R8_PALETTE.vanilla).glow, '--ih': String(r8Hash(name) % 360) } };
};
function r8OpenInstancePicker() {
  pdInstallations().then((list) => {
    list = list || [];
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;z-index:2147483600;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.55);backdrop-filter:blur(6px)';
    const card = document.createElement('div');
    card.style.cssText = 'width:min(460px,92vw);max-height:80vh;display:flex;flex-direction:column;gap:10px;padding:18px;border-radius:16px;background:#16161b;border:1px solid #2a2a33;color:#eae6ff;font-family:inherit';
    card.innerHTML = '<h2 style="margin:0;font-size:18px;font-weight:800">Play which instance?</h2><div style="overflow:auto;display:flex;flex-direction:column;gap:8px" class="r8-inst-list"></div><div style="display:flex;gap:8px;justify-content:flex-end"><button type="button" class="r8-close" style="padding:8px 14px;border-radius:9px;border:1px solid #2a2a33;background:#1d1d23;color:#eae6ff;cursor:pointer">Cancel</button></div>';
    const listEl = card.querySelector('.r8-inst-list');
    if (!list.length) {
      listEl.innerHTML = '<div style="color:#9a9aa8;font-size:12px;padding:12px">No instances yet. Create one first.</div>';
    } else {
      for (const inst of list) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.style.cssText = 'display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;border:1px solid #2a2a33;background:#1d1d23;color:#eae6ff;cursor:pointer;text-align:left;font:inherit';
        btn.innerHTML = '<strong style="flex:1 1 auto">' + r7Esc(inst.name) + '</strong><small style="color:#9a9aa8">' + inst.gameVersion + (inst.loader && inst.loader.type && inst.loader.type !== 'vanilla' ? ' · ' + inst.loader.type : '') + '</small>';
        btn.addEventListener('click', async () => { overlay.remove(); await r8PlayActive(inst); });
        listEl.appendChild(btn);
      }
    }
    card.querySelector('.r8-close').addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
    overlay.appendChild(card);
    document.body.appendChild(overlay);
  }).catch(() => {});
}
let r8Launching = false;
async function r8PlayActive(inst) {
  if (r8Launching) return;
  const st = window.__mistApp.getState();
  inst ||= (await pdInstallations()).find((i) => i.id === st.activeInstallationId);
  if (!inst) { location.hash = '#/installations?new=1'; return; }
  r8Launching = true;
  try {
    await st.setActive(inst.id);
    window.dispatchEvent(new CustomEvent('mist:game-starting', { detail: { name: inst.name, installationId: inst.id } }));
    const result = await window.mist.launch.play(inst.id);
    window.dispatchEvent(new CustomEvent('mist:game-start-finished', { detail: { ok: Boolean(result.ok) } }));
    if (!result.ok) showMistToast(result.error || 'Minecraft did not start', 'error');
  } catch (error) {
    window.dispatchEvent(new CustomEvent('mist:game-start-finished', { detail: { ok: false } }));
    showMistToast(error.message || 'Minecraft did not start', 'error');
  } finally { r8Launching = false; }
}
let r8SpotIndex = Math.floor(Math.random() * R7_SERVERS.length);
let r8SpotTimer = 0;
async function r8JoinServer(s) {
  const id = mistActiveId() || (await pdInstallations())?.[0]?.id;
  if (!id) { showMistToast('Create an instance first', ''); return; }
  const inst = (pdInstCache.list || []).find((i) => i.id === id);
  r7BeginLaunch(inst?.name || s.name, id);
  try {
    const r = await window.mist.launch.play(id, { name: s.name, address: s.address, port: s.port || 25565 });
    if (!r?.ok) { r7Launch.state = 'idle'; paintLaunch(); showMistToast(r?.error || 'Minecraft did not start', ''); }
  } catch (e) { r7Launch.state = 'idle'; paintLaunch(); showMistToast(String(e?.message || e), ''); }
}
function paintSpotlight(card) {
  const list = R7_SERVERS;
  r8SpotIndex = ((r8SpotIndex % list.length) + list.length) % list.length;
  const [name, address, cat, desc] = list[r8SpotIndex];
  const body = card.querySelector('.mist-spot-body');
  body.classList.remove('is-in'); void body.offsetWidth; body.classList.add('is-in');
  card.dataset.addr = address;
  card.querySelector('.mist-spot-icon').textContent = name[0];
  card.querySelector('.mist-spot-name').textContent = name;
  card.querySelector('.mist-spot-addr').textContent = address; card.querySelector('.mist-spot-addr').dataset.cat = cat;
  card.querySelector('.mist-spot-desc').textContent = desc;
  card.querySelector('.mist-spot-tag').textContent = cat;
  card.querySelector('.mist-spot-count').textContent = `${r8SpotIndex + 1} / ${list.length}`;
  const status = card.querySelector('.mist-spot-status'); status.textContent = 'Pinging…'; status.className = 'mist-spot-status';
  r7QueuePing(address, (d) => {
    if (card.dataset.addr !== address) return;
    status.textContent = d.online ? `${(d.players?.online ?? 0).toLocaleString()} playing` : 'Offline';
    status.classList.add(d.online ? 'is-online' : 'is-offline');
    if (d.icon) card.querySelector('.mist-spot-icon').innerHTML = `<img src="${r7Esc(d.icon)}" alt="">`;
  });
}
function syncSpotlight(grid) {
  let card = document.getElementById('mist-home-spot');
  if (!card) {
    card = document.createElement('section'); card.id = 'mist-home-spot'; card.setAttribute('aria-label', 'Server spotlight');
    card.innerHTML = `<header><span class="mist-spot-kicker">${R7I.server}Server spotlight</span><span class="mist-spot-nav"><small class="mist-spot-count"></small><button type="button" data-d="-1" aria-label="Previous server">&#8249;</button><button type="button" data-d="1" aria-label="Next server">&#8250;</button></span></header>
      <div class="mist-spot-body"><span class="mist-spot-icon"></span><div class="mist-spot-copy"><strong class="mist-spot-name"></strong><code class="mist-spot-addr"></code><p class="mist-spot-desc"></p></div></div>
      <footer><span class="mist-spot-status"></span><span class="mist-spot-tag"></span><span class="mist-spot-gap"></span><button type="button" class="mist-spot-copybtn" title="Copy IP">${R7I.copy}</button><button type="button" class="mist-spot-all" title="Browse all servers" aria-label="Browse all servers">${R7I.server}</button><button type="button" class="mist-spot-join">${R7I.play}<span>Join</span></button></footer>`;
    card.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b) return;
      if (b.dataset.d) { r8SpotIndex += Number(b.dataset.d); paintSpotlight(card); return; }
      const s = R7_SERVERS[r8SpotIndex];
      if (b.classList.contains('mist-spot-copybtn')) { window.mist.app.copyToClipboard(s[1]); showMistToast(`Copied ${s[1]}`, 'ok'); }
      else if (b.classList.contains('mist-spot-all')) openServerLibrary();
      else if (b.classList.contains('mist-spot-join')) r8JoinServer({ name: s[0], address: s[1] });
    });
    card.addEventListener('pointerenter', () => { card.dataset.hover = '1'; });
    card.addEventListener('pointerleave', () => { delete card.dataset.hover; });
    paintSpotlight(card);
  }
  if (card.parentElement !== grid) grid.appendChild(card);
  if (!r8SpotTimer) r8SpotTimer = setInterval(() => {
    const c = document.getElementById('mist-home-spot');
    if (!c || !c.isConnected || c.dataset.hover || document.hidden) return;
    r8SpotIndex += 1; paintSpotlight(c);
  }, 9000);
}
function syncR8(home) {
  home = home ? document.querySelector('.home-screen') : null;
  if (!home) return;
  const grid = home.querySelector('.home-grid');
  if (grid) syncSpotlight(grid);
  const hero = document.getElementById('mist-home-hero');
  if (hero && !hero.querySelector('.mist-hh-cubes')) {
    const cubes = document.createElement('div'); cubes.className = 'mist-hh-cubes'; cubes.setAttribute('aria-hidden', 'true');
    for (let i = 0; i < 9; i += 1) { const s = document.createElement('i'); s.style.setProperty('--i', String(i)); cubes.appendChild(s); }
    hero.prepend(cubes);
  }
  const rp = document.querySelector('#mist-recently-played .mist-rp-grid');
  if (rp && rp.childElementCount && rp.lastElementChild?.classList.contains('mist-rp-new') === false) {
    rp.querySelector('.mist-rp-new')?.remove();
    const add = document.createElement('button'); add.type = 'button'; add.className = 'mist-rp-new';
    add.innerHTML = '<span class="mist-rp-new-plus">+</span><span class="mist-rp-copy"><strong>New instance</strong><small>Vanilla, Fabric, Forge…</small></span>';
    add.addEventListener('click', () => clickExisting(['.create-install-cta', '.create-install-button', '[aria-label="Open the new installation dialog"]', '[aria-label*="Create an installation"]']));
    rp.appendChild(add);
  }
}


function r9Button(label, action, cls = '') {
  const b = pdMk('button', `mist-r9-button ${cls}`, label); b.type = 'button';
  b.addEventListener('click', async () => { if (b.disabled) return; b.disabled = true; try { await action(b); } catch (e) { showMistToast(e?.message || 'Action failed', 'error'); } finally { b.disabled = false; } });
  return b;
}
function r9Modal(title) {
  const dlg = document.createElement('dialog'); dlg.className = 'mist-r9-modal';
  const head = pdMk('header'), heading = pdMk('h2', '', title), body = pdMk('main'), foot = pdMk('footer');
  const close = () => dlg.close();
  head.append(heading, r9Button('Close', close)); dlg.append(head, body, foot); document.body.append(dlg);
  dlg.addEventListener('close', () => dlg.remove(), { once: true });
  dlg.addEventListener('click', (e) => { if (e.target === dlg) { const r = dlg.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) close(); } });
  dlg.showModal(); return { dlg, body, foot, close };
}
function r9Field(parent, label, input) { const wrap = pdMk('label', 'mist-r9-field'); wrap.append(pdMk('span', '', label), input); parent.append(wrap); return input; }
function r9Input(type, value, attrs = {}) { const input = document.createElement('input'); input.type = type; input.value = value ?? ''; Object.entries(attrs).forEach(([k, v]) => input.setAttribute(k, String(v))); return input; }
function r9Select(options, value) { const s = document.createElement('select'); options.forEach(([id, label]) => { const o = document.createElement('option'); o.value = id; o.textContent = label; s.append(o); }); s.value = value; return s; }
async function r9SaveSettings(patch) {
  const store = window.__mistApp?.getState();
  if (store?.saveSettings) await store.saveSettings(patch); else await window.mist.settings.update(patch);
}
async function openMistLaunchSettings(id) {
  const inst = id ? await window.mist.installations.get(id) : null;
  const settings = await window.mist.settings.get();
  const { dlg, body, foot, close } = r9Modal(inst ? `${inst.name} · Launch settings` : 'Launch preferences');
  const form = pdMk('form', 'mist-r9-form'); body.append(form);
  body.prepend(pdMk('p', 'mist-r9-muted', inst ? 'Overrides apply only to this instance. Changes take effect on the next launch.' : 'Defaults for new installations. Existing instances keep their own launch settings.'));
  const memory = r9Field(form, 'Memory allocation (MB)', r9Input('number', inst?.memoryMb ?? settings.defaultMemoryMb, { min: 512, max: 65536, step: 256, required: true }));
  const presets = pdMk('div', 'mist-r9-presets'); [2048, 4096, 6144, 8192].forEach((n) => presets.append(r9Button(`${n / 1024} GB`, () => { memory.value = n; }))); form.append(presets);
  form.append(pdMk('p', 'mist-r9-muted', '2–4 GB for vanilla; 4–8 GB for larger packs. Leave memory available for Windows. More memory is not always faster.'));
  const java = r9Field(form, 'Java executable · blank for automatic', r9Input('text', inst ? inst.javaPath : settings.javaPath, { placeholder: 'Automatic Java selection' }));
  form.append(r9Button('Choose Java executable', async () => { const picked = await window.mist.java.pick(); if (typeof picked === 'string') java.value = picked; }));
  const jvm = document.createElement('textarea'); jvm.value = inst?.jvmArgs ?? settings.jvmArgs; jvm.maxLength = 4000; jvm.rows = 3; r9Field(form, 'JVM arguments · optional', jvm);
  let width, height, fullscreen, visibility;
  if (inst) {
    width = r9Field(form, 'Window width', r9Input('number', inst.resolution?.width || 1280, { min: 320, max: 7680, required: true }));
    height = r9Field(form, 'Window height', r9Input('number', inst.resolution?.height || 720, { min: 240, max: 4320, required: true }));
    fullscreen = r9Field(form, 'Start in fullscreen', r9Input('checkbox', '')); fullscreen.checked = Boolean(inst.fullscreen);
    visibility = r9Field(form, 'Launcher while playing', r9Select([['keep', 'Keep open'], ['hide', 'Hide until game exits'], ['close', 'Close launcher']], inst.visibility || 'keep'));
  }
  const status = pdMk('p', 'mist-r9-status'); status.setAttribute('role', 'status'); foot.append(status);
  foot.append(r9Button('Cancel', close), r9Button('Save preferences', async () => {
    if (!form.reportValidity()) return;
    const patch = { javaPath: java.value.trim() || null, jvmArgs: jvm.value };
    try {
      if (inst) await window.mist.installations.update(id, { ...patch, memoryMb: Number(memory.value), resolution: { width: Number(width.value), height: Number(height.value) }, fullscreen: fullscreen.checked, visibility: visibility.value });
      else await r9SaveSettings({ ...patch, defaultMemoryMb: Number(memory.value) });
      showMistToast('Launch preferences saved', 'success'); close();
    } catch (e) { status.textContent = e?.message || 'Could not save preferences'; }
  }, 'is-primary'));
  dlg.querySelector('input')?.focus();
}
function r9Redact(text) {
  return String(text).replace(/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/g, '[email removed]').replace(/(?:Bearer\s+)[\w.\-]+/gi, 'Bearer [removed]').replace(/\beyJ[\w-]+\.[\w-]+\.[\w-]+\b/g, '[token removed]').replace(/\b(?:access[_-]?token|refresh[_-]?token|client[_-]?secret|password|authorization|client[_-]?id)\s*[=:]\s*[^\s,;]+/gi, '[credential removed]').replace(/\b[A-Z][A-Z0-9_]*(?:TOKEN|SECRET|CLIENT_ID)[A-Z0-9_]*\b/g, '[configuration removed]').replace(/[A-Z]:\\Users\\[^\\\s]+/gi, '[user folder]');
}
function mistDiscordEmbed(payload) {
  const fields = [{ name: 'Category', value: payload.category || 'other', inline: true }];
  if (payload.diagnostics) fields.push({ name: 'Version / Platform', value: `${payload.diagnostics.version || 'unknown'} · ${payload.diagnostics.platform || 'unknown'}`, inline: true });
  if (payload.steps) fields.push({ name: 'Steps to reproduce', value: String(payload.steps).slice(0, 1024) });
  return { username: 'Mist Launcher Bug Reports', thread_name: String(payload.title).slice(0, 80) || 'Bug report', embeds: [{ title: String(payload.title).slice(0, 256), description: String(payload.description).slice(0, 4096), color: 0xe74c3c, fields, timestamp: new Date().toISOString(), footer: { text: 'Mist Launcher' } }] };
}
const MIST_DISCORD_WEBHOOK = atob('aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvMTU3MTA1NzE4ODkwMDgzNTM1OC9kVmdLdThmLXk2ZVBDQU5XRm8yNmtMOXNkV01xUFo2UTljQUk3dGpBQVIwQ3YwM1lxOFktcmktTDJfS1NnUzB0LTM3TA==');
function openMistBugReport() {
  const { dlg, body, foot, close } = r9Modal('Report a bug');
  body.append(pdMk('p', 'mist-r9-muted', 'Reports are private to the Mist maintainer. Do not include passwords, account details, or access tokens. Logs and accounts are never attached automatically.'));
  const form = pdMk('form', 'mist-r9-form'); body.append(form);
  const title = r9Field(form, 'Short title', r9Input('text', '', { required: true, minlength: 5, maxlength: 160, placeholder: 'What went wrong?' }));
  const category = r9Field(form, 'Category', r9Select([['launcher', 'Launcher / interface'], ['launch', 'Game launch'], ['downloads', 'Downloads / installs'], ['accounts', 'Sign-in'], ['other', 'Other']], 'launcher'));
  const desc = document.createElement('textarea'); desc.required = true; desc.minLength = 10; desc.maxLength = 6000; desc.rows = 4; r9Field(form, 'What happened? What did you expect?', desc);
  const steps = document.createElement('textarea'); steps.maxLength = 4000; steps.rows = 3; r9Field(form, 'Steps to reproduce', steps);
  const diag = r9Field(form, 'Include launcher version and OS only', r9Input('checkbox', '')); diag.checked = false;
  const status = pdMk('p', 'mist-r9-status'); status.setAttribute('role', 'status'); body.append(status);
  const payload = () => ({ title: r9Redact(title.value.trim()), category: category.value, description: r9Redact(desc.value.trim()), steps: r9Redact(steps.value.trim()), ...(diag.checked ? { diagnostics: { version: '0.1.26', platform: 'Windows' } } : {}) });
  const controller = new AbortController(); dlg.addEventListener('close', () => controller.abort(), { once: true });
  foot.append(r9Button('Copy report', async () => { if (!form.reportValidity()) return; await window.mist.app.copyToClipboard(JSON.stringify(payload(), null, 2)); status.textContent = 'Redacted report copied. You can keep it if the report service is not yet deployed.'; }), r9Button('Send private report', async (button) => {
    if (!form.reportValidity()) return;
    status.textContent = 'Sending…'; button.textContent = 'Sending…';
    try {
      const response = await fetch(MIST_DISCORD_WEBHOOK, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(mistDiscordEmbed(payload())), signal: AbortSignal.any([controller.signal, AbortSignal.timeout(15000)]), credentials: 'omit', redirect: 'error' });
      if (!response.ok && response.status !== 204) throw new Error(`Discord rejected the report (status ${response.status}). Copy your report to keep it.`);
      status.textContent = 'Report sent privately to the maintainer.'; button.hidden = true; form.querySelectorAll('input,textarea,select').forEach((e) => e.disabled = true);
    } catch (e) { if (dlg.isConnected) status.textContent = controller.signal.aborted ? 'Cancelled. Delivery may already have occurred.' : (e?.message || 'Could not send. Copy your report to keep it.'); }
    finally { button.textContent = 'Send private report'; }
  }, 'is-primary'));
}
function r9Settings(screen) {
  if (screen.querySelector('.mist-r9-settings')) return;
  const panel = pdMk('section', 'mist-r9-settings mist-r9-panel');
  panel.innerHTML = '<div class="mist-r9-eyebrow">CONTROL CENTER</div><h2>Make room for your kind of play.</h2><p class="mist-r9-muted">Useful defaults, less friction. Your existing settings remain below.</p>';
  const actions = pdMk('div', 'mist-r9-actions');
  actions.append(r9Button('Launch preferences', () => openMistLaunchSettings()), r9Button('Theme studio', (b) => openThemeStudio(b)), r9Button('Clear completed downloads', async () => { await window.mist.jobs.clearFinished(); showMistToast('Finished download history cleared', 'success'); }), r9Button('Report a bug', openMistBugReport)); panel.append(actions);
  const search = r9Input('search', '', { placeholder: 'Find a setting: memory, Java, downloads…', 'aria-label': 'Find settings' }); panel.append(search);
  const results = pdMk('div', 'mist-r9-search-results'); panel.append(results);
  search.addEventListener('input', () => {
    results.replaceChildren(); const q = search.value.trim().toLowerCase(); if (!q) return;
    const sections = [...screen.querySelectorAll('.settings-content > .panel')];
    const matches = sections.filter((s) => s.textContent.toLowerCase().includes(q));
    if (!matches.length) results.append(pdMk('p', 'mist-r9-muted', 'No matching settings. Try Java, memory, or downloads.'));
    matches.forEach((s) => results.append(r9Button(s.querySelector('h2,h3')?.textContent || s.id, () => { s.scrollIntoView({ behavior: 'smooth', block: 'start' }); s.classList.add('mist-r9-highlight'); setTimeout(() => s.classList.remove('mist-r9-highlight'), 1400); })));
  });
  const toggles = pdMk('div', 'mist-r9-toggle-grid'); panel.append(toggles);
  window.mist.settings.get().then((settings) => {
    if (!panel.isConnected) return;
    [['autoJava', 'Automatic Java', 'Choose the right Java runtime for Minecraft.'], ['backupBeforeModpackUpdate', 'Back up before updates', 'Keep a recovery copy before updating a modpack.'], ['showGameLog', 'Live game log', 'Open the game console when launching.'], ['confirmBeforeDelete', 'Confirm deletions', 'Ask before removing installations.']].forEach(([key, label, help]) => {
      const row = pdMk('label', 'mist-r9-toggle'); const copy = pdMk('span'); copy.append(pdMk('strong', '', label), pdMk('small', '', help));
      const input = r9Input('checkbox', ''); input.checked = Boolean(settings[key]);
      input.addEventListener('change', async () => { input.disabled = true; try { await r9SaveSettings({ [key]: input.checked }); } catch (e) { input.checked = !input.checked; showMistToast(e.message, 'error'); } finally { input.disabled = false; } }); row.append(copy, input); toggles.append(row);
    });
  }).catch((e) => showMistToast(e.message, 'error'));
  screen.prepend(panel);
}
function r9Accounts(screen) {
  if (screen.querySelector('.mist-r9-accounts')) return;
  const panel = pdMk('section', 'mist-r9-accounts mist-r9-panel');
  panel.innerHTML = '<div class="mist-r9-eyebrow">PLAYER IDENTITY</div><h2>Your worlds. Your identity.</h2><p class="mist-r9-muted">Microsoft accounts unlock online play when they own Java Edition. Offline profiles are for local play and supported servers.</p><div class="mist-r9-actions"></div>';
  panel.querySelector('.mist-r9-actions').append(r9Button('Refresh selected Microsoft account', async () => { const a = await window.mist.accounts.current(); if (!a || a.type === 'offline' || a.kind === 'offline') { showMistToast('Select a Microsoft account first', ''); return; } await window.mist.accounts.refresh(a.uuid); showMistToast('Account refreshed', 'success'); }), r9Button('Sign-in help', () => { const { body } = r9Modal('Account help'); body.append(pdMk('p', '', 'Choose Add Microsoft account below, open the official sign-in page, and enter the device code. Never share that code. If your session expired, use Refresh. Offline profiles do not provide a Minecraft license or access to authenticated servers.')); }));
  screen.prepend(panel);
}
function r9Instance(screen) {
  const match = location.hash.match(/^#\/installations\/([^/?]+)/); if (!match) return;
  const id = decodeURIComponent(match[1]); const existing = screen.querySelector('.mist-r9-instance-tools');
  if (existing?.dataset.id === id) return; existing?.remove();
  const bar = pdMk('section', 'mist-r9-instance-tools mist-r9-panel'); bar.dataset.id = id;
  bar.append(pdMk('div', 'mist-r9-eyebrow', 'INSTANCE TOOLBOX'));
  const actions = pdMk('div', 'mist-r9-actions');
  actions.append(r9Button('Launch settings', () => openMistLaunchSettings(id)), r9Button('Verify game files', async () => { const running = await window.mist.launch.state(id); if (running?.running) throw new Error('Stop the game before verifying files.'); await window.mist.installations.ensureFiles(id); showMistToast('Game files verified', 'success'); }), r9Button('Mods folder', () => window.mist.mods.openFolder(id)), r9Button('Screenshots', () => window.mist.app.openScreenshotsFolder(id)), r9Button('Change icon', () => window.mist.installations.setIcon(id)), r9Button('Duplicate instance', () => r9Duplicate(id)));
  bar.append(actions, pdMk('p', 'mist-r9-muted', 'Verify repairs Minecraft files without deleting your worlds. Back up important worlds before changing a modded setup.'));
  const header = screen.querySelector('.detail-header'); if (header) header.after(bar); else screen.prepend(bar);
}
async function r9Duplicate(id) {
  const inst = await window.mist.installations.get(id); const { body, foot, close } = r9Modal('Duplicate instance');
  const form = pdMk('form', 'mist-r9-form'); body.append(form);
  const name = r9Field(form, 'New instance name', r9Input('text', `${inst.name} copy`.slice(0, 64), { maxlength: 64, required: true }));
  const mods = r9Field(form, 'Copy installed mods', r9Input('checkbox', '')); mods.checked = true;
  const worlds = r9Field(form, 'Copy worlds (may take time)', r9Input('checkbox', ''));
  foot.append(r9Button('Create copy', async () => { if (!form.reportValidity() || !name.value.trim()) return; const copy = await window.mist.installations.duplicate(id, { name: name.value.trim(), copyMods: mods.checked, copyWorlds: worlds.checked }); close(); location.hash = `#/installations/${encodeURIComponent(copy.id)}`; showMistToast('Instance duplicated', 'success'); }, 'is-primary'));
}
function syncR9(home) {
  const tools = document.querySelector('.mist-titlebar-tools');
  if (tools && !tools.querySelector('.mist-tool-report')) { const b = r9Button('!', openMistBugReport, 'mist-contact-button mist-tool-report'); b.title = 'Report a bug'; b.setAttribute('aria-label', 'Report a bug'); tools.append(b); }
  document.querySelectorAll('.mist-r9-bundles-nav').forEach((node) => node.remove());
  document.querySelectorAll('.mist-r9-hero-bottom').forEach((node) => { if (/bundles/i.test(node.textContent || '')) node.remove(); });
  const settings = document.querySelector('.settings-screen'); if (settings) r9Settings(settings);
  const accounts = document.querySelector('.accounts-screen'); if (accounts) r9Accounts(accounts);
  const detail = document.querySelector('.detail-screen'); if (detail) r9Instance(detail);
}


// BEGIN MIST BUNDLES PURE
const R9_BUNDLE_PROJECTS = {
  sodium: 'Sodium', lithium: 'Lithium', 'ferrite-core': 'FerriteCore',
  entityculling: 'Entity Culling', immediatelyfast: 'ImmediatelyFast', moreculling: 'More Culling',
  modernfix: 'ModernFix', 'dynamic-fps': 'Dynamic FPS', debugify: 'Debugify',
  appleskin: 'AppleSkin', 'mouse-tweaks': 'Mouse Tweaks', jade: 'Jade',
  'inventory-profiles-next': 'Inventory Profiles Next', shulkerboxtooltip: 'Shulker Box Tooltip',
  betterf3: 'BetterF3', controlling: 'Controlling', clumps: 'Clumps',
  litematica: 'Litematica', minihud: 'MiniHUD', tweakeroo: 'Tweakeroo', worldedit: 'WorldEdit',
  'effortless-building': 'Effortless Building', 'construction-wand': 'Construction Wand',
  'xaeros-minimap': "Xaero's Minimap", 'xaeros-world-map': "Xaero's World Map",
  'natures-compass': "Nature's Compass", 'explorers-compass': "Explorer's Compass",
  waystones: 'Waystones', travelersbackpack: "Traveler's Backpack", iris: 'Iris Shaders',
  zoomify: 'Zoomify', 'screenshot-to-clipboard': 'Screenshot to Clipboard', replaymod: 'ReplayMod',
  'camera-utils': 'Camera Utils', freecam: 'Freecam', continuity: 'Continuity',
  lambdynamiclights: 'LambDynamicLights', 'not-enough-animations': 'Not Enough Animations',
  visuality: 'Visuality', 'falling-leaves': 'Falling Leaves', 'presence-footsteps': 'Presence Footsteps',
  'sound-physics-remastered': 'Sound Physics Remastered', emi: 'EMI',
  'simple-voice-chat': 'Simple Voice Chat', 'chat-heads': 'Chat Heads', chatpatches: 'Chat Patches',
  'no-chat-reports': 'No Chat Reports', emotecraft: 'Emotecraft'
};
// All 48 slugs verified as mod projects with Modrinth's public /v2/projects batch API.
// Tier arrays are additions, not alternatives; only Sodium is a replacement renderer.
const R9_BUNDLE_RECIPES = [
  { id: 'fps', title: 'FPS Boost', category: 'FPS',
    description: 'Rendering, memory and background-work tools. Results depend on your setup; no FPS increase is promised.',
    tiers: [['sodium', 'lithium', 'ferrite-core'], ['entityculling', 'immediatelyfast', 'moreculling'], ['modernfix', 'dynamic-fps', 'debugify']] },
  { id: 'qol', title: 'Everyday comforts', category: 'QoL',
    description: 'Food information, inventory gestures and useful overlays. Some features need server support.',
    tiers: [['appleskin', 'mouse-tweaks', 'jade'], ['shulkerboxtooltip', 'betterf3'], ['inventory-profiles-next', 'controlling', 'clumps']] },
  { id: 'building', title: 'Builder’s workbench', category: 'Building',
    description: 'Schematics, measurements and building tools. World-editing tools need permissions or server support; back up worlds first.',
    tiers: [['litematica', 'minihud'], ['tweakeroo', 'worldedit'], ['effortless-building', 'construction-wand']] },
  { id: 'exploration', title: 'Beyond the base', category: 'Exploration',
    description: 'Maps, destination-finding and travel gear. Content mods may also be required on the server; back up worlds first.',
    tiers: [['xaeros-minimap', 'xaeros-world-map'], ['natures-compass', 'explorers-compass'], ['waystones', 'travelersbackpack']] },
  { id: 'screenshots', title: 'Frame the moment', category: 'Screenshots',
    description: 'Shader support, zoom and camera tools. Shader packs are not included. Check server rules before using Freecam.',
    tiers: [['sodium', 'iris'], ['zoomify', 'screenshot-to-clipboard'], ['replaymod', 'camera-utils', 'freecam']] },
  { id: 'ambience', title: 'A little more atmosphere', category: 'Ambience',
    description: 'Connected textures, lighting, animation and sound. Extra effects can increase hardware demands; textures may need a resource pack.',
    tiers: [['continuity', 'lambdynamiclights'], ['not-enough-animations', 'visuality'], ['falling-leaves', 'presence-footsteps', 'sound-physics-remastered']] },
  { id: 'inventory', title: 'An organized inventory', category: 'Inventory',
    description: 'Recipe browsing, food information and inventory conveniences. Review sorting keybinds after installation.',
    tiers: [['emi', 'appleskin'], ['mouse-tweaks', 'shulkerboxtooltip'], ['inventory-profiles-next', 'controlling']] },
  { id: 'multiplayer', title: 'Better together', category: 'Multiplayer',
    description: 'Voice, readable chat and social tools. Voice and emotes may need server support. Respect server rules and privacy preferences.',
    tiers: [['simple-voice-chat', 'chat-heads'], ['chatpatches'], ['no-chat-reports', 'emotecraft']] }
];
const R9_BUNDLE_TIERS = ['Small', 'Medium', 'High'];
function r9BundleProjects(recipe, tier) {
  const end = R9_BUNDLE_TIERS.indexOf(tier);
  return end < 0 ? [] : [...new Set(recipe.tiers.slice(0, end + 1).flat())];
}
function r9BundleSearch(query) {
  const terms = String(query || '').trim().toLowerCase().split(/\s+/).filter(Boolean);
  return R9_BUNDLE_RECIPES.filter((recipe) => {
    const text = recipe.searchText || (recipe.searchText = [recipe.title, recipe.category, recipe.description,
      ...recipe.tiers.flat().map((slug) => `${slug} ${R9_BUNDLE_PROJECTS[slug]}`)].join(' ').toLowerCase());
    return terms.every((term) => text.includes(term));
  });
}
function r9BundleCompatible(version, inst, type = 'mod') {
  const loader = pdInstLoader(inst);
  return Boolean(inst?.gameVersion && version?.id && version.releaseType === 'release' &&
    typeof version.file?.url === 'string' && /^https:\/\//i.test(version.file.url) &&
    Array.isArray(version.gameVersions) && version.gameVersions.includes(inst.gameVersion) &&
    (type !== 'mod' || (!['vanilla', 'minecraft', ''].includes(loader) && Array.isArray(version.loaders) && version.loaders.some((value) => (loader === 'quilt' ? ['quilt', 'fabric'] : [loader]).includes(String(value).toLowerCase())))) &&
    pdVersionFits(version, inst, type));
}
function r9BundleChooseVersion(versions, inst, type = 'mod') {
  return (Array.isArray(versions) ? versions : []).filter((v) => r9BundleCompatible(v, inst, type))
    .sort((a, b) => (Date.parse(b.publishedAt) || 0) - (Date.parse(a.publishedAt) || 0))[0] || null;
}
function r9BundleRunning(states, installationId) {
  if (!Array.isArray(states)) return null;
  if (states.some((state) => state?.installationId === installationId && state.running === true)) return true;
  if (states.some((state) => !state || !state.installationId || typeof state.running !== 'boolean')) return null;
  return false;
}
// Shared gate also bounds requests left in flight after closing/cancelling a preview.
function r9BundleGate(limit) {
  let active = 0;
  const queue = [];
  const drain = () => {
    while (active < limit && queue.length) {
      const item = queue.shift();
      active++;
      Promise.resolve().then(item.task).then(item.resolve, item.reject).finally(() => { active--; drain(); });
    }
  };
  return (task) => new Promise((resolve, reject) => { queue.push({ task, resolve, reject }); drain(); });
}
function r9BundleResult(result) {
  if (!result || !Array.isArray(result.installed) || !Array.isArray(result.skipped) || !Array.isArray(result.warnings)) {
    throw new Error('Unrecognized installation result; check the instance before retrying.');
  }
  const describe = (value) => typeof value === 'string' ? value :
    [value?.name || value?.filename, value?.reason || value?.message].filter(Boolean).join(': ') || 'No detail supplied';
  return { installed: result.installed.length, skipped: result.skipped.length, warnings: result.warnings.length,
    details: [...result.skipped.map((value) => `Skipped: ${describe(value)}`),
      ...result.warnings.map((value) => `Warning: ${describe(value)}`)] };
}
// END MIST BUNDLES PURE

const r9BundleVersionGate = r9BundleGate(4);
let r9BundleDialog = null;
function openMistBundleInstall(installationId, selectedRecipe, selectedTier = 'Small') {
  if (r9BundleDialog?.isConnected) { r9BundleDialog.focus(); return; }
  const dialog = pdMk('dialog', 'mist-r9-modal mist-r9-bundles');
  r9BundleDialog = dialog;
  dialog.id = 'mist-bundles-dialog';
  dialog.setAttribute('aria-labelledby', 'mist-bundles-title');
  const header = pdMk('header', 'mist-r9-header');
  const title = pdMk('h2', 'mist-r9-title', 'Bundles'); title.id = 'mist-bundles-title';
  const close = pdMk('button', 'mist-r9-close', 'Close'); close.type = 'button';
  close.setAttribute('aria-label', 'Close Bundles'); header.append(title, close);
  const main = pdMk('main', 'mist-r9-main');
  const intro = pdMk('p', 'mist-r9-muted', 'Review every included project. Resource packs and shaders must be enabled in-game after installation.');
  const fields = pdMk('div', 'mist-r9-fields');
  const instanceLabel = pdMk('label', 'mist-r9-field');
  instanceLabel.append(pdMk('span', 'mist-r9-label', 'Instance'));
  const instances = pdMk('select', 'mist-r9-select'); instances.disabled = true;
  instanceLabel.append(instances);
  const instanceInfo = pdMk('div', 'mist-r9-instance');
  const searchLabel = pdMk('label', 'mist-r9-field');
  searchLabel.append(pdMk('span', 'mist-r9-label', 'Search bundles'));
  const search = pdMk('input', 'mist-r9-input'); search.type = 'search'; search.placeholder = 'Purpose or mod name';
  searchLabel.append(search); fields.append(instanceLabel, searchLabel);
  const status = pdMk('p', 'mist-r9-status', 'Loading instances…'); status.setAttribute('role', 'status');
  const content = pdMk('div', 'mist-r9-bundle-content');
  const footer = pdMk('footer', 'mist-r9-footer');
  const back = pdMk('button', 'mist-r9-btn', 'Back to bundles'); back.type = 'button'; back.hidden = true;
  const cancel = pdMk('button', 'mist-r9-btn', 'Cancel'); cancel.type = 'button'; cancel.hidden = true;
  const install = pdMk('button', 'mist-r9-btn mist-r9-primary', 'Install selected'); install.type = 'button'; install.hidden = true;
  footer.append(back, cancel, install); main.append(intro, fields, instanceInfo, status, content);
  dialog.append(header, main, footer);
  const state = { closed: false, phase: 'loading', installations: [], inst: null, job: null, rows: [], tiers: {} };
  const alive = (job) => !state.closed && state.job === job && !job.cancelled;
  const errorText = (error) => String(error?.message || error || 'Unknown error');
  const busy = () => ['checking', 'installing'].includes(state.phase);
  function syncControls() {
    instances.disabled = busy() || !state.installations.length;
    search.disabled = busy(); searchLabel.hidden = Boolean(selectedRecipe) || state.phase !== 'browse';
    back.hidden = !['preview', 'done'].includes(state.phase);
    cancel.hidden = !busy(); cancel.disabled = Boolean(state.job?.stopRequested);
    install.hidden = state.phase !== 'preview';
    const count = state.rows.filter((row) => row.version && row.checked).length;
    install.textContent = `Install ${count} selected project${count === 1 ? '' : 's'}`;
    install.disabled = !count;
  }
  function invalidate() { if (state.job) state.job.cancelled = true; state.job = null; }
  function browse(message) {
    invalidate(); state.phase = 'browse'; state.rows = []; content.replaceChildren();
    status.textContent = message || (state.inst ? 'Choose a bundle to preview compatible releases.' : 'Create an instance first to use bundles.');
    const cards = pdMk('div', 'mist-r9-grid mist-r9-bundle-grid');
    for (const recipe of r9BundleSearch(search.value)) {
      const card = pdMk('article', 'mist-r9-card mist-r9-bundle-card');
      card.append(pdMk('span', 'mist-r9-badge', recipe.category), pdMk('h3', 'mist-r9-card-title', recipe.title),
        pdMk('p', 'mist-r9-muted', recipe.description));
      const segment = pdMk('div', 'mist-r9-segmented'); segment.setAttribute('role', 'group');
      segment.setAttribute('aria-label', `${recipe.title} scope`);
      const tier = state.tiers[recipe.id] || 'Small';
      for (const value of R9_BUNDLE_TIERS) {
        const button = pdMk('button', `mist-r9-segment${value === tier ? ' is-active' : ''}`, value);
        button.type = 'button'; button.setAttribute('aria-pressed', String(value === tier));
        button.onclick = () => { state.tiers[recipe.id] = value; browse(); }; segment.append(button);
      }
      const preview = pdMk('button', 'mist-r9-btn', `Preview ${r9BundleProjects(recipe, tier).length} mods`);
      preview.type = 'button'; preview.disabled = !state.inst;
      preview.onclick = () => { void preflight(recipe, tier); };
      card.append(segment, preview); cards.append(card);
    }
    if (!cards.childNodes.length) cards.append(pdMk('p', 'mist-r9-empty', 'No bundles match your search.'));
    content.append(cards); syncControls();
  }
  function chooseInstance() {
    state.inst = state.installations.find((inst) => String(inst.id) === instances.value) || null;
    instanceInfo.replaceChildren();
    if (state.inst) instanceInfo.append(pdInstallArt(state.inst, 'mist-r9-instance-art'),
      pdMk('span', 'mist-r9-muted', `${state.inst.name} · Minecraft ${state.inst.gameVersion} · ${pdInstLoader(state.inst)}`));
    if (selectedRecipe) void preflight(selectedRecipe, selectedTier); else browse();
  }
  function renderPreview(recipe, tier) {
    content.replaceChildren(pdMk('h3', 'mist-r9-section-title', `${recipe.title} · ${tier}`),
      pdMk('p', 'mist-r9-muted', recipe.description),
      pdMk('p', 'mist-r9-notice', 'Exact Minecraft releases; loader matching applies to mods only. Required mod dependencies may be installed even if unchecked. Resource packs and shaders are downloaded, not enabled. Shaders need Iris or another compatible loader. Back up first; cross-project conflicts are not audited.'));
    const list = pdMk('div', 'mist-r9-list mist-r9-bundle-preview');
    for (const row of state.rows) {
      const entry = pdMk('div', 'mist-r9-row');
      const label = pdMk('label', 'mist-r9-check');
      const check = pdMk('input'); check.type = 'checkbox'; check.checked = row.checked;
      check.disabled = !row.version;
      label.append(check, pdMk('span', 'mist-r9-mod-name', R9_BUNDLE_PROJECTS[row.slug]));
      const detail = pdMk('span', 'mist-r9-muted', row.version
        ? `${row.version.versionNumber || row.version.name || row.version.id} · ${state.inst.gameVersion} · ${pdInstLoader(state.inst)} · release`
        : row.reason);
      const outcome = pdMk('p', 'mist-r9-row-status', row.version ? `Selected · ${r10TypeName(r10ContentType(row.slug))}` : 'Unavailable — will skip');
      check.onchange = () => { row.checked = check.checked; outcome.textContent = row.checked ? 'Selected' : 'Unchecked — will skip'; syncControls(); };
      row.check = check; row.outcome = outcome;
      entry.append(label, detail, outcome); list.append(entry);
    }
    content.append(list);
  }
  async function preflight(recipe, tier) {
    if (!state.inst || busy()) return;
    const inst = state.inst;
    invalidate();
    const job = { cancelled: false, stopRequested: false, requestId: null };
    state.job = job; state.phase = 'checking'; state.rows = [];
    const slugs = r9BundleProjects(recipe, tier); let completed = 0;
    content.replaceChildren(pdMk('p', 'mist-r9-muted', `Checking ${recipe.title} · ${tier}. No files are being installed.`));
    status.textContent = `Checking releases: 0 / ${slugs.length}`; syncControls();
    const rows = await Promise.all(slugs.map((slug) => r9BundleVersionGate(async () => {
      if (!alive(job)) return null;
      let row;
      try {
        row = await r11ResolveProject(slug, inst);
        if (!alive(job)) return null;
        row.checked = Boolean(row.version);
      } catch (error) {
        if (!alive(job)) return null;
        row = { slug, version: null, checked: false, reason: `Could not check availability: ${errorText(error)}` };
      }
      completed++; status.textContent = `Checking releases: ${completed} / ${slugs.length}`;
      return row;
    })));
    if (!alive(job)) return;
    const shaderSupport = rows.find(row => ['iris','oculus'].includes(row.slug));
    if (shaderSupport && !shaderSupport.version) for (const row of rows) {
      if (r10ContentType(row.slug) === 'shader') { row.version = null; row.checked = false; row.reason = 'Required shader support is unavailable for this instance.'; }
    }
    state.rows = rows; state.phase = 'preview'; renderPreview(recipe, tier);
    const available = rows.filter((row) => row.version).length;
    status.textContent = `${available} selected · ${rows.length - available} unavailable. Review the full list before installing.`;
    syncControls();
  }
  function requestStop() {
    const job = state.job;
    if (!job || !busy()) return;
    if (state.phase === 'checking') { dismiss(); return; }
    if (job.stopRequested) return;
    job.stopRequested = true;
    status.textContent = 'Stopping after the active request settles. Already installed files remain; cancellation does not roll back changes.';
    syncControls();
    if (job.requestId) {
      // Only this dialog's current request, never a global download/game cancellation.
      const requestId = job.requestId;
      void Promise.resolve().then(() => {
        if (typeof window.mist.catalog.cancel !== 'function') throw new Error('Cancellation is unavailable');
        return window.mist.catalog.cancel(requestId);
      }).catch((error) => {
        if (alive(job) && state.phase === 'installing') status.textContent =
          `Could not cancel the active request: ${errorText(error)}. Waiting for it; no further mods will start. Already installed files remain.`;
      });
    }
  }
  async function installSelected() {
    if (state.phase !== 'preview') return;
    const selected = state.rows.filter((row) => row.version && row.checked);
    if (!selected.length) return;
    const inst = state.inst, job = state.job;
    state.phase = 'installing'; job.stopRequested = false;
    for (const row of state.rows) { row.check.disabled = true; if (row.checked) row.outcome.textContent = 'Queued'; }
    syncControls();
    const totals = { installed: 0, skipped: 0, warnings: 0, failed: 0, attempted: 0 };
    let halted = '';
    const progress = pdMk('progress', 'mist-r9-progress'); progress.max = selected.length; progress.value = 0;
    progress.setAttribute('aria-label', 'Completed selected content requests'); content.prepend(progress);
    try {
      // Re-read before modifying files: the instance may have changed since preview.
      const fresh = await window.mist.installations.list();
      if (!alive(job)) return;
      const target = Array.isArray(fresh) && fresh.find((item) => item.id === inst.id);
      if (!target || target.gameVersion !== inst.gameVersion || pdInstLoader(target) !== pdInstLoader(inst)) {
        throw new Error('The instance changed or was removed. Close and preview again.');
      }
      for (const row of selected) {
        if (job.stopRequested || !alive(job)) break;
        const running = r9BundleRunning(await window.mist.launch.running(), inst.id);
        if (!alive(job) || job.stopRequested) break;
        if (running !== false) {
          halted = running ? 'The game is running. Stop it and preview again before installing.' :
            'Could not confirm that the game is stopped. Nothing further will be installed.';
          break;
        }
        status.textContent = `Installing ${totals.attempted + 1} / ${selected.length}: ${R9_BUNDLE_PROJECTS[row.slug]} (including required dependencies)…`;
        row.outcome.textContent = 'Installing…';
        try {
          job.requestId = crypto.randomUUID(); totals.attempted++;
          const result = await window.mist.catalog.install({ installationId: inst.id, projectType: r10ContentType(row.slug),
            source: 'modrinth', projectId: row.version.projectId || R10_CONTENT[row.slug]?.id || row.slug, versionId: row.version.id,
            withDependencies: r10ContentType(row.slug) === 'mod', requestId: job.requestId });
          if (!alive(job)) return;
          const report = r9BundleResult(result);
          totals.installed += report.installed; totals.skipped += report.skipped; totals.warnings += report.warnings;
          row.outcome.textContent = `${report.installed} file(s) installed · ${report.skipped} skipped · ${report.warnings} warnings.` +
            (report.installed ? '' : ' No new files reported.') + (report.details.length ? ` ${report.details.join(' | ')}` : '');
        } catch (error) {
          if (!alive(job)) return;
          totals.failed++;
          row.outcome.textContent = `Interrupted or failed: ${errorText(error)}. Some files may have been written; check the instance before retrying.`;
        } finally { job.requestId = null; }
        progress.value = totals.attempted;
      }
    } catch (error) { halted = `Installation stopped: ${errorText(error)}`; }
    if (!alive(job)) return;
    for (const row of selected) if (row.outcome.textContent === 'Queued') row.outcome.textContent = 'Not attempted — stopped.';
    state.phase = 'done';
    const unavailable = state.rows.filter((row) => !row.version).length;
    const unchecked = state.rows.filter((row) => row.version && !row.checked).length;
    status.textContent = `${job.stopRequested ? 'Stopped' : halted ? 'Stopped' : 'Finished'}: ${totals.attempted} / ${selected.length} content requests attempted; ` +
      `${totals.installed} files installed (including dependencies), ${totals.skipped} native skips, ${totals.failed} failed/interrupted requests, ${totals.warnings} warnings. ` +
      `${unavailable} unavailable and ${unchecked} unchecked items excluded. ${halted} ` +
      'Installed files remain. No changes were rolled back; review each result above.';
    syncControls();
    if (typeof showMistToast === 'function') showMistToast(job.stopRequested || halted || totals.failed || totals.warnings || totals.skipped
      ? 'Bundle run ended. Review the results for skips, warnings or incomplete work.' : 'Bundle run finished. Review the installation results.');
  }
  function dismiss() {
    if (state.phase === 'installing') requestStop();
    state.closed = true; invalidate(); dialog.close(); dialog.remove();
    if (r9BundleDialog === dialog) r9BundleDialog = null;
  }
  close.onclick = dismiss; cancel.onclick = requestStop; back.textContent = 'Back to collection'; back.onclick = dismiss;
  install.onclick = () => { void installSelected(); };
  search.oninput = () => { if (state.phase === 'browse') browse(); };
  instances.onchange = chooseInstance;
  dialog.addEventListener('cancel', (event) => { event.preventDefault(); dismiss(); });
  // Also invalidate if a surrounding host closes the native dialog programmatically.
  dialog.addEventListener('close', () => {
    if (!state.closed) { requestStop(); state.closed = true; invalidate(); dialog.remove(); }
    if (r9BundleDialog === dialog) r9BundleDialog = null;
  });
  document.body.append(dialog); dialog.showModal();
  void Promise.resolve().then(() => window.mist.installations.list()).then((list) => {
    if (state.closed) return;
    if (!Array.isArray(list)) throw new Error('Unrecognized instance response');
    state.installations = list.filter((inst) => inst && inst.id);
    for (const inst of state.installations) {
      const option = pdMk('option', '', `${inst.name} · ${inst.gameVersion} · ${pdInstLoader(inst)}`);
      option.value = String(inst.id); instances.append(option);
    }
    const preferred = installationId == null ? (typeof mistActiveId === 'function' ? mistActiveId() : null) : installationId;
    const chosen = state.installations.find((inst) => String(inst.id) === String(preferred)) || state.installations[0];
    if (chosen) instances.value = String(chosen.id);
    chooseInstance();
  }).catch((error) => {
    if (state.closed) return;
    state.phase = 'browse'; status.textContent = `Could not load instances: ${errorText(error)}. Close Bundles and try again.`; syncControls();
  });
}


const R10_CONTENT = Object.fromEntries(R10_REMOTE_PROJECTS.map(p => [p.slug, p]));
for (const p of R10_REMOTE_PROJECTS) R9_BUNDLE_PROJECTS[p.slug] = p.title;
const r10ContentType = slug => R10_CONTENT[slug]?.type || 'mod';
const r10TypeName = type => ({ mod: 'Mod', resourcepack: 'Resource pack', shader: 'Shader' })[type] || type;
function r10Kind(recipe) {
  if (recipe.kind) return recipe.kind;
  const types = new Set(recipe.tiers.flat().map(r10ContentType));
  return recipe.kind = types.size > 1 ? 'Mixed' : types.has('resourcepack') ? 'Resource packs' : types.has('shader') ? 'Shaders' : 'Mods';
}
function r10GenerateBundles() {
  const themes = [
    { id:'medieval', title:'Medieval Adventure', category:'Adventure', description:'Explore dungeons and mineshafts, defend villages and collect rare artifacts. World-generation content affects newly explored chunks; back up worlds and match server mods.', tiers:[['yungs-better-dungeons','yungs-better-mineshafts'],['guard-villagers','artifacts'],['supplementaries','comforts']] },
    { id:'wanderer', title:'Wanderer’s Journey', category:'Adventure', description:'Find landmarks, carry a travel kit and rest along the way. Content mods may also be required on your server.', tiers:[['dungeons-and-taverns','natures-compass'],['travelersbackpack','comforts'],['waystones','artifacts']] },
    { id:'homestead', title:'Cozy Homestead', category:'Building', description:'Cooking, decorative building and everyday comforts for a lived-in home. Review server requirements before adding content mods.', tiers:[['farmers-delight','supplementaries'],['comforts','appleskin'],['jade','shulkerboxtooltip']] },
    { id:'treasure', title:'Treasure Hunter', category:'Adventure', description:'Larger structures, hidden loot and navigation tools for expeditions. New structures generate in unexplored terrain.', tiers:[['when-dungeons-arise','artifacts'],['explorers-compass','travelersbackpack'],['waystones','jade']] },
    { id:'wildlands', title:'Into the Wildlands', category:'Exploration', description:'New landscapes with practical mapping and camping tools. Back up your world; terrain mods belong on both client and server.', tiers:[['regions-unexplored','natures-compass'],['xaeros-minimap','comforts'],['xaeros-world-map','travelersbackpack']] },
    { id:'village', title:'Village Life', category:'Building', description:'Build a thriving village with guards, cooking and decorative details. Availability depends on the selected loader and game version.', tiers:[['guard-villagers','farmers-delight'],['supplementaries','jade'],['appleskin','comforts']] }
  ];
  R9_BUNDLE_RECIPES.push(...themes);
  const bases = R9_BUNDLE_RECIPES.slice(), generated = [], seen = new Set(bases.map(r => [...new Set(r.tiers.flat())].sort().join('|')));
  const add = r => {
    const used = new Set(); r.tiers = r.tiers.map(t => t.filter(s => R9_BUNDLE_PROJECTS[s] && !used.has(s) && used.add(s)));
    const sig = [...used].sort().join('|'); if (!used.size || seen.has(sig)) return;
    seen.add(sig); r.generated = true; generated.push(r);
  };
  const styles = [['bare-bones','Storybook'],['faithful-32x','Classic'],['faithless','Rustic'],['bettervanillabuilding','Villagecraft'],['3d-default','Sculpted'],['rotrblocks','Stone & Timber']];
  const lighting = [['potato-shaders','Soft Light'],['bsl-shaders','Golden Hour'],['complementary-reimagined','Dreamlight'],['complementary-unbound','Cinematic'],['sildurs-vibrant-shaders','Vivid Skies'],['super-duper-vanilla','Summer Days'],['rethinking-voxels','Radiant Nights']];
  for (const [texture, style] of styles) {
    for (const [ui, mood] of [[null,'Retreat'],['default-dark-mode','After Dark'],['fresh-gui','Fresh Start']]) {
      add({id:`textures-${texture}-${ui||'classic'}`,title:`${style} ${mood}`,category:'Textures',description:'A vanilla-friendly visual collection with a single texture foundation and optional interface styling. No mod loader is installed or required; enable packs in-game.',tiers:[[texture],ui?[ui]:[],[]]});
    }
    for (const base of bases) {
      if (base.id === 'fps' && !['bare-bones','faithful-32x'].includes(texture)) continue;
      add({id:`${base.id}-${texture}`,title:`${base.title} — ${style}`,category:base.category,description:`${base.description} A ${style.toLowerCase()} texture theme ties the collection together. Vanilla instances receive resources only.`,tiers:base.tiers.map((t,i)=>[...t,...(i===0?[texture]:i===1?['default-dark-mode']:[])])});
      if (base.id === 'fps') continue;
      for (const [shader, mood] of lighting.slice(0,3)) add({id:`${base.id}-${texture}-${shader}`,title:`${base.title} — ${style} ${mood}`,category:base.category,description:`${base.description} ${style} textures and ${mood.toLowerCase()} lighting; shader effects increase GPU demand. Preview selects loader-compatible support, while vanilla receives only resources.`,tiers:base.tiers.map((t,i)=>[...t,...(i===0?[texture,'sodium','iris',shader]:i===1?['default-dark-mode']:[])])});
    }
    for (const [shader,mood] of lighting) add({id:`cinema-${texture}-${shader}`,title:`${style} ${mood}`,category:'Visuals',description:'A coordinated texture and lighting theme. Preview chooses Iris or Oculus and a matching renderer where available. Enable packs in-game; visual effects can reduce performance.',tiers:[[texture,'sodium','iris',shader],['default-dark-mode'],[]]});
  }
  for (const [shader,mood] of lighting) add({id:`shader-${shader}`,title:mood,category:'Shaders',description:'Shader-only download for an instance with a working compatible shader loader already installed. Mist does not enable shaders automatically.',tiers:[[shader],[],[]]});
  R9_BUNDLE_RECIPES.push(...generated);
}
const r11VersionCache = new Map();
async function r11ResolveProject(slug, inst) {
  const loader = pdInstLoader(inst), type = r10ContentType(slug);
  if (type !== 'resourcepack' && ['vanilla','minecraft',''].includes(loader)) return {slug,version:null,reason:'Vanilla supports resource packs only. Choose a modded instance for this item.'};
  const candidates = loader === 'forge' ? ({sodium:['embeddium'],iris:['oculus'],lithium:['lithium','radium']}[slug] || [slug]) : [slug];
  for (const candidate of candidates) {
    const key = `${candidate}|${inst.gameVersion}|${loader}`;
    let versions = r11VersionCache.get(key);
    if (!versions || versions.expires < Date.now()) {
      const values = await window.mist.catalog.versions({source:'modrinth',projectId:R10_CONTENT[candidate]?.id || candidate,projectType:type,gameVersion:inst.gameVersion,...(type==='mod'?{loader}:{})});
      if (!Array.isArray(values)) throw new Error('Unrecognized version response');
      versions = {values,expires:Date.now()+300000};
      if(r11VersionCache.size >= 256) r11VersionCache.delete(r11VersionCache.keys().next().value);
      r11VersionCache.set(key,versions);
    }
    const version = r9BundleChooseVersion(versions.values,inst,type);
    if (version) return {slug:candidate,originalSlug:slug,version,reason:''};
  }
  return {slug,version:null,reason:`No compatible release for Minecraft ${inst.gameVersion} / ${loader}. Not installed.`};
}
r10GenerateBundles();
let r10Target = null;
const r10BrowseState = { search: '', kind: 'All', category: 'All', shown: 24, saved: false };
function r10Saved() { try { const v = JSON.parse(localStorage.getItem('mist-bundle-saved') || '[]'); return Array.isArray(v) ? v : []; } catch { return []; } }
function r10Save(id) { const s = new Set(r10Saved()); if (s.has(id)) s.delete(id); else s.add(id); localStorage.setItem('mist-bundle-saved', JSON.stringify([...s])); }
function openMistBundles(id) { location.hash = '#/'; }
function r10Art(recipe, cls = '') {
  const art = pdMk('div', `mist-bundle-art ${cls}`); const hash = [...recipe.id].reduce((n,c) => (n*31+c.charCodeAt(0))>>>0, 0); art.style.setProperty('--bundle-hue', String(hash%360));
  const icons = [...new Set(recipe.tiers.flat())].map(s=>R10_CONTENT[s]).filter(p=>p?.icon && /^https:\/\//.test(p.icon)).slice(0,3);
  if (icons.length) for (const p of icons) { const img = pdMk('img'); img.src=p.icon; img.alt=''; img.loading='lazy'; img.onerror=()=>{ img.hidden=true; }; art.append(img); }
  else { art.innerHTML = pdIcon(recipe.category === 'FPS' ? 'sparkle' : 'pack', 50); }
  art.append(pdMk('span','mist-bundle-art-label',recipe.category)); return art;
}
function r10ContentList(recipe,tier) {
  const list = pdMk('div','mist-bundle-included');
  for (const slug of r9BundleProjects(recipe,tier)) {
    const type=r10ContentType(slug), row=pdMk('article','mist-bundle-content-row');
    const icon=pdMk('span','mist-bundle-content-icon'); const p=R10_CONTENT[slug];
    if(p?.icon && /^https:\/\//.test(p.icon)){const img=pdMk('img');img.src=p.icon;img.alt='';img.loading='lazy';icon.append(img);}else icon.innerHTML=pdIcon(type==='mod'?'pack':'world',20);
    const copy=pdMk('div');copy.append(pdMk('strong','',R9_BUNDLE_PROJECTS[slug]),pdMk('small','',p?.description || 'Modrinth project · compatible release selected at install time'));
    const button=r9Button('View project',()=>openStandaloneProject({id:slug,source:'modrinth',title:R9_BUNDLE_PROJECTS[slug],iconUrl:p?.icon||''},type));
    row.append(icon,copy,pdMk('span','mist-bundle-chip',r10TypeName(type)),button);list.append(row);
  } return list;
}
function r10Detail(screen,recipe) {
  let tier='Small', tab='Overview'; screen.replaceChildren();
  const back=r9Button('Back to bundles',()=>{location.hash='#/bundles';});back.classList.add('mist-bundle-back'); screen.append(back);
  const hero=pdMk('section','mist-bundle-detail-hero');hero.append(r10Art(recipe,'is-large'));
  const copy=pdMk('div','mist-bundle-detail-copy');copy.append(pdMk('span','mist-r9-eyebrow',`${recipe.generated?'AUTO-ASSEMBLED COLLECTION':'MIST ESSENTIALS'} / ${r10Kind(recipe)}`),pdMk('h1','',recipe.title),pdMk('p','',recipe.description));
  const meta=pdMk('div','mist-bundle-chips');meta.append(pdMk('span','mist-bundle-chip',recipe.category),pdMk('span','mist-bundle-chip','Modrinth sources'),pdMk('span','mist-bundle-chip','Checked before install'));copy.append(meta);
  const actions=pdMk('div','mist-r9-actions');const scope=r9Select(R9_BUNDLE_TIERS.map(t=>[t,t]),tier);scope.setAttribute('aria-label','Bundle size');
  const install=r9Button('Review & install',()=>openMistBundleInstall(r10Target||mistActiveId(),recipe,tier),'is-primary');
  const save=r9Button(r10Saved().includes(recipe.id)?'Saved':'Save bundle',()=>{r10Save(recipe.id);save.textContent=r10Saved().includes(recipe.id)?'Saved':'Save bundle';});
  actions.append(scope,install,save);copy.append(actions);hero.append(copy);screen.append(hero);
  const tabs=pdMk('nav','mist-bundle-tabs');tabs.setAttribute('aria-label','Bundle details');const content=pdMk('div','mist-bundle-detail-grid'),main=pdMk('div','mist-bundle-overview'),side=pdMk('aside','mist-bundle-facts');content.append(main,side);screen.append(tabs,content);
  function paint(){
    const items=r9BundleProjects(recipe,tier),count={mod:0,resourcepack:0,shader:0};items.forEach(s=>count[r10ContentType(s)]++);
    tabs.replaceChildren();for(const name of ['Overview','Included content','Installation']){const b=r9Button(name==='Included content'?`Included content (${items.length})`:name,()=>{tab=name;paint();});b.classList.toggle('is-active',tab===name);b.setAttribute('aria-current',tab===name?'page':'false');tabs.append(b);}
    main.replaceChildren();side.replaceChildren(pdMk('h3','','Bundle information'));
    for(const [a,b] of [['Scope',tier],['Mods',count.mod],['Resource packs',count.resourcepack],['Shaders',count.shader],['Collection',recipe.generated?'Rule-generated':'Curated'],['Loaders','Fabric · Forge · Quilt'],['Vanilla','Resource packs only'],['Compatibility','Checked for your instance']]){const row=pdMk('div');row.append(pdMk('span','',a),pdMk('strong','',String(b)));side.append(row);}
    side.append(pdMk('p','mist-r9-muted','Collections combine projects, not complete modpacks. Availability varies by Minecraft version and loader. No cross-mod compatibility guarantee.'));
    if(tab==='Overview'){
      main.append(pdMk('h2','',`About ${recipe.title}`),pdMk('p','',recipe.description));
      const cards=pdMk('div','mist-bundle-feature-grid');for(const [title,text] of [['Your choice of scope','Small starts with the essentials. Medium and High add optional content; bigger does not mean faster.'],['Know what you install','Every included project is listed below. Preview exact compatible versions and deselect anything you do not want.'],['Generated with boundaries','One primary texture style and one shader per combination. Projects are never silently installed or enabled.']]){const card=pdMk('article');card.append(pdMk('h3','',title),pdMk('p','',text));cards.append(card);}main.append(cards,pdMk('h2','','What’s inside'),r10ContentList(recipe,tier));
    }else if(tab==='Included content')main.append(pdMk('h2','',`${items.length} included projects`),r10ContentList(recipe,tier));
    else {
      main.append(pdMk('h2','','Install in three steps')); const ol=pdMk('ol');for(const s of ['Choose Small, Medium or High, then Review & install.','Select an instance. Mist checks published releases against its Minecraft version and the loader required by each mod. Unavailable items are clearly marked.','Review the selected files, then install. Enable resource packs and shaders inside Minecraft; their order matters.'])ol.append(pdMk('li','',s));main.append(ol,pdMk('p','mist-bundle-notice','Back up important worlds first. Mods require a compatible loader; shader packs require Iris or another supported shader loader. Some resource-pack features require extra mods or OptiFine. Cancelling stops future work but does not remove files already installed.'));
    }
  }
  scope.onchange=()=>{tier=scope.value;paint();};paint();
}
function r10Library(screen){
  screen.innerHTML='<section class="mist-bundle-library-hero"><div><span class="mist-r9-eyebrow">THE COLLECTION LAB</span><h1>Better together.</h1><p>Discover ready-to-build combinations. Mods, resource packs, shaders—or a little of everything.</p><div class="mist-bundle-library-stats"></div></div><div class="mist-bundle-orbit" aria-hidden="true"></div></section><div class="mist-bundle-toolbar"></div><div class="mist-bundle-categories"></div><p class="mist-bundle-result-count" role="status"></p><div class="mist-bundle-grid"></div><div class="mist-bundle-more"></div>';
  const stats=screen.querySelector('.mist-bundle-library-stats');stats.textContent=`${R9_BUNDLE_RECIPES.length} collections · ${Object.keys(R9_BUNDLE_PROJECTS).length} source projects · 3 scopes`;
  screen.querySelector('.mist-bundle-orbit').innerHTML=pdIcon('pack',74);
  const toolbar=screen.querySelector('.mist-bundle-toolbar'),search=r9Input('search',r10BrowseState.search,{'aria-label':'Search bundles',placeholder:'Search FPS Boost, textures, a shader, or any included mod…'}),kind=r9Select(['All','Mods','Resource packs','Shaders','Mixed'].map(k=>[k,k]),r10BrowseState.kind);kind.setAttribute('aria-label','Bundle content type');
  const saved=r9Button(r10BrowseState.saved?'Showing saved':'Saved bundles',()=>{r10BrowseState.saved=!r10BrowseState.saved;saved.textContent=r10BrowseState.saved?'Showing saved':'Saved bundles';r10BrowseState.shown=24;paint();});
  const reset=r9Button('Reset',()=>{Object.assign(r10BrowseState,{search:'',kind:'All',category:'All',shown:24,saved:false});search.value='';kind.value='All';saved.textContent='Saved bundles';paint();});toolbar.append(search,kind,saved,reset);
  const categories=screen.querySelector('.mist-bundle-categories');
  function paint(){
    categories.replaceChildren();for(const cat of ['All',...new Set(R9_BUNDLE_RECIPES.map(r=>r.category))]){const b=r9Button(cat,()=>{r10BrowseState.category=cat;r10BrowseState.shown=24;paint();});b.classList.toggle('is-active',r10BrowseState.category===cat);categories.append(b);}
    const savedIds = new Set(r10BrowseState.saved ? r10Saved() : []);
    const matches=r9BundleSearch(r10BrowseState.search).filter(r=>(r10BrowseState.kind==='All'||r10Kind(r)===r10BrowseState.kind)&&(r10BrowseState.category==='All'||r.category===r10BrowseState.category)&&(!r10BrowseState.saved||savedIds.has(r.id)));
    screen.querySelector('.mist-bundle-result-count').textContent=`${matches.length} collections · generated locally from themed recipes · compatibility checked before installation`;
    const grid=screen.querySelector('.mist-bundle-grid');grid.replaceChildren();
    for(const recipe of matches.slice(0,r10BrowseState.shown)){
      const card=pdMk('button','mist-bundle-card');card.type='button';card.append(r10Art(recipe));const body=pdMk('div','mist-bundle-card-copy');body.append(pdMk('span','mist-r9-eyebrow',`${r10Kind(recipe)} / ${recipe.generated?'GENERATED':'CURATED'}`),pdMk('h3','',recipe.title),pdMk('p','',recipe.description));
      const foot=pdMk('div','mist-bundle-card-foot');foot.append(pdMk('span','',`${new Set(recipe.tiers.flat()).size} projects`),pdMk('span','','View collection →'));body.append(foot);card.append(body);card.onclick=()=>{location.hash=`#/bundles/${encodeURIComponent(recipe.id)}`;};grid.append(card);
    }
    if(!matches.length)grid.append(pdMk('p','mist-bundle-empty','No matching collections. Try another filter or reset your search.'));
    const more=screen.querySelector('.mist-bundle-more');more.replaceChildren();if(matches.length>r10BrowseState.shown)more.append(r9Button(`Load more (${matches.length-r10BrowseState.shown} remaining)`,()=>{r10BrowseState.shown+=24;paint();}));
  }
  let searchTimer;
  search.oninput=()=>{r10BrowseState.search=search.value;r10BrowseState.shown=24;clearTimeout(searchTimer);searchTimer=setTimeout(()=>{if(screen.isConnected && (location.hash==='#/bundles'||location.hash==='#/bundles/'))paint();},140);};kind.onchange=()=>{r10BrowseState.kind=kind.value;r10BrowseState.shown=24;paint();};paint();
}
function syncMistBundlePage(){
  document.body.classList.remove('mist-bundle-route');
  document.getElementById('mist-bundle-screen')?.remove();
  const nav=document.querySelector('.mist-r9-bundles-nav'); if (nav) nav.remove();
}
window.addEventListener('hashchange',()=>setTimeout(syncMistBundlePage,0));


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
    const paintList=(items,emptyText)=>{results.replaceChildren();items.forEach((item)=>{const card=document.createElement('button');card.type='button';card.className='mist-review-result';card.dataset.videoId=item.id;card.setAttribute('role','listitem');const img=document.createElement('img');img.src=`https://img.youtube.com/vi/${item.id}/mqdefault.jpg`;img.alt='';img.loading='lazy';const copy=document.createElement('span');copy.innerHTML='<strong></strong><small></small>';copy.querySelector('strong').textContent=item.title;copy.querySelector('small').textContent=[item.creator,...(item.tags||[]).slice(0,2)].filter(Boolean).join(' · ');card.append(img,copy);card.addEventListener('click',()=>selectVideo(item));results.appendChild(card);});if(!items.length){const empty=document.createElement('p');empty.className='mist-review-empty';empty.textContent=emptyText;const youtube=document.createElement('button');youtube.type='button';youtube.className='mist-review-youtube';youtube.textContent='Search YouTube';youtube.addEventListener('click',()=>{try{window.mist.app.openExternal(`https://www.youtube.com/results?search_query=${encodeURIComponent(search.value.trim()||'Minecraft mod showcase')}`);}catch{}});empty.appendChild(youtube);results.appendChild(empty);}return items.length;};const paintResults=()=>{const query=search.value.trim().toLocaleLowerCase();const matches=MOD_SHOWCASES.filter((item)=>`${item.title} ${item.tags.join(' ')} ${item.creator}`.toLocaleLowerCase().includes(query));return paintList(matches,'No saved showcases match.');};let searchSeq=0,searchTimer=0;const runSearch=async()=>{const q=search.value.trim();if(!q){searchSeq++;paintResults();return;}const seq=++searchSeq;const wait=document.createElement('p');wait.className='mist-review-empty';wait.textContent='Searching YouTube…';results.replaceChildren(wait);let items=[];try{const found=await window.mist.videos.search(`${q} minecraft mod`,8);items=(found||[]).filter((v)=>v&&v.id).map((v)=>({id:v.id,title:v.title||'Video',creator:v.channel||'YouTube',tags:[v.duration,v.views].filter(Boolean),summary:v.title||'',contents:[q]}));}catch{}if(seq!==searchSeq)return;if(paintList(items,'No videos found for this search.'))selectVideo(items[0]);};
    search.addEventListener('input',()=>{clearTimeout(searchTimer);if(!search.value.trim()){searchSeq++;paintResults();return;}searchTimer=setTimeout(runSearch,700);});search.addEventListener('keydown',(e)=>{if(e.key==='Enter'){e.preventDefault();clearTimeout(searchTimer);runSearch();}});dock.querySelector('[data-review-search]').addEventListener('click',()=>{if(!search.value.trim()){search.focus();return;}clearTimeout(searchTimer);runSearch();});
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

function syncTitlebarBrand() {
  const titlebar = document.querySelector('.titlebar');
  if (!titlebar || titlebar.querySelector('.mist-titlebar-brand')) return;
  const brand = document.createElement('div');
  brand.className = 'mist-titlebar-brand';
  brand.setAttribute('aria-label', 'Mist Launcher version 0.1.26');
  brand.innerHTML = '<img src="./assets/mist-logo-DWC6NdSO.png" alt=""><span><strong>Mist Launcher</strong><small>0.1.26</small></span>';
  titlebar.prepend(brand);
}

function installDock() {
  const root = document.getElementById('root');
  if (!root || !document.body) return false;
  syncTitlebarBrand();
  const routeIcons = [
    [/versions?/i,'routeVersions'],[/modpacks?/i,'routeModpacks'],[/^mods?$/i,'routeMods'],
    [/resource\s*packs?/i,'routeResources'],[/shaders?/i,'routeShaders'],[/world\s*chat/i,'routeChat'],[/^worlds?$/i,'routeWorlds'],
    [/skins?/i,'routeSkins'],[/capes?/i,'routeCapes']
  ];
  const routeIconOrder = ['routeVersions','routeModpacks','routeMods','routeResources','routeShaders','routeDatapacks','routeChat','routeSkins','routeCapes'];
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
      const divider = document.createElement('div'); divider.className = 'mist-side-divider';
      footer.replaceChildren(divider, account, settings);
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
  if (!/^#\/bundles(?:\/|$)/.test(location.hash)) {
    syncHomeHero(home);
    syncR7(home);
    syncR8(home);
  }
  syncR9(home);
  document.getElementById('mist-home-mod-review')?.remove();
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
  const oldBottom = document.getElementById('mist-home-bottom-dock');
  if (oldBottom) oldBottom.remove();
  syncTitlebarContacts();
  syncDataPacksNav(routeNav);
  syncRecentlyPlayed(home);
  return true;
}

function syncBrowseInstances(home) {
  const screen = document.querySelector('.home-screen');
  const featured = document.querySelector('.home-featured-sidebar');
  if (!screen || !featured) return;
  let button = screen.querySelector('.mist-browse-instances');
  if (!button) {
    button = makeButton({ className: 'mist-browse-instances', label: 'Browse instances', icon: 'install', action: () => clickExisting(['.bottom-navigation-item[aria-label="Installations"]']) });
    button.insertBefore(document.createTextNode('Browse instances'), button.querySelector('.mist-dock-tooltip'));
    screen.prepend(button);
  } else if (button.parentElement !== screen) {
    screen.prepend(button);
  }
  button.hidden = !home;
}

function ensureInstanceList() {
  let panel = document.getElementById('mist-instance-list');
  if (panel) return panel;
  panel = document.createElement('section'); panel.id = 'mist-instance-list'; panel.hidden = true;
  panel.setAttribute('role','dialog'); panel.setAttribute('aria-label','Installed instances');
  panel.innerHTML = '<div class="mist-instance-list-head"><strong>Installed instances</strong><button type="button" class="mist-instance-list-close" aria-label="Close">×</button></div><div class="mist-instance-list-body"></div>';
  panel.querySelector('.mist-instance-list-close').addEventListener('click', () => { panel.hidden = true; });
  document.body.appendChild(panel);
  if (!document.documentElement.dataset.mistInstanceListEvents) {
    document.documentElement.dataset.mistInstanceListEvents = '1';
    document.addEventListener('pointerdown', (event) => {
      const current = document.getElementById('mist-instance-list');
      if (current && !current.hidden && !current.contains(event.target) && !event.target.closest('.mist-side-instances')) current.hidden = true;
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') { const current = document.getElementById('mist-instance-list'); if (current) current.hidden = true; }
    });
  }
  return panel;
}

function toggleInstanceList() {
  const panel = ensureInstanceList();
  const trigger = document.querySelector('.mist-side-instances');
  const body = panel.querySelector('.mist-instance-list-body');
  body.replaceChildren();
  window.mist.installations.list().then((installations) => {
    if (!installations.length) {
      const empty = document.createElement('p'); empty.className = 'mist-instance-list-empty'; empty.textContent = 'No installations yet.';
      body.appendChild(empty);
      return;
    }
    installations.forEach((installation) => {
      const row = document.createElement('button'); row.type = 'button'; row.className = 'mist-instance-list-row';
      const art = pdInstallArt(installation, 'mist-instance-list-art');
      const copy = document.createElement('span'); copy.className = 'mist-instance-list-copy';
      copy.innerHTML = '<strong></strong><small></small>';
      copy.querySelector('strong').textContent = installation.name;
      copy.querySelector('small').textContent = `Minecraft ${installation.gameVersion} · ${installation.loader && installation.loader.type ? installation.loader.type : 'Vanilla'}${installation.lastPlayed ? ' · ' + timeAgoLabel(installation.lastPlayed) : ''}`;
      row.append(art, copy);
      if (installation.id === mistActiveId()) { row.classList.add('is-active'); row.setAttribute('aria-current', 'true'); const tag = document.createElement('em'); tag.className = 'mist-instance-list-tag'; tag.textContent = 'Selected'; row.appendChild(tag); }
      row.addEventListener('click', () => {
        panel.hidden = true;
        mistSelectInstance(installation);
      });
      body.appendChild(row);
    });
  }).catch(() => { body.replaceChildren(); const err = document.createElement('p'); err.className = 'mist-instance-list-empty'; err.textContent = 'Could not read installations.'; body.appendChild(err); });
  panel.hidden = !panel.hidden;
  if (!panel.hidden && trigger) {
    const rect = trigger.getBoundingClientRect();
    panel.style.left = `${Math.max(96, rect.right + 10)}px`;
    panel.style.bottom = `${Math.max(12, window.innerHeight - rect.bottom - 10)}px`;
    panel.style.top = 'auto';
  }
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

function syncInstallPicker() { enhanceModpackInstallDialog(); }

const formatCount = (value) => {
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) return '0';
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
  return String(Math.round(n));
};
const timeAgoLabel = (value) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
};

const CONTACT_LINKS = [
  { icon: 'discord', label: 'Discord', url: 'https://discord.gg/J9BzGzxt2r' },
  { icon: 'github', label: 'GitHub', url: 'https://github.com/Sacrifizer/MistLauncher' },
  { icon: 'globe', label: 'Website', url: 'https://mistlauncher.vercel.app/' }
];
function syncTitlebarContacts() {
  const titlebar = document.querySelector('.titlebar');
  if (!titlebar) return;
  const builtinDiscord = titlebar.querySelector('.discord-button');
  if (builtinDiscord) builtinDiscord.style.display = 'none';
  let group = titlebar.querySelector('.mist-titlebar-contacts');
  if (!group) {
    group = document.createElement('div');
    group.className = 'mist-titlebar-contacts';
    group.setAttribute('aria-label', 'Contact links');
    CONTACT_LINKS.forEach((link) => {
      const button = document.createElement('button');
      button.type = 'button'; button.className = 'mist-contact-button';
      button.setAttribute('aria-label', link.label); button.title = link.label;
      button.innerHTML = svg(link.icon);
      button.addEventListener('click', () => { try { window.mist.app.openExternal(link.url); } catch {} });
      group.appendChild(button);
    });
    const utilities = titlebar.querySelector('.titlebar-utilities');
    if (utilities && utilities.parentNode) utilities.parentNode.insertBefore(group, utilities);
    else titlebar.appendChild(group);
  }
}

/* ------------------------------------------------------------------ datapacks */
function datapackState(text, done) {
  const state = document.createElement('p'); state.className = 'mist-dp-state'; state.textContent = text;
  if (done) { const retry = document.createElement('button'); retry.type = 'button'; retry.className = 'mist-dp-retry'; retry.textContent = 'Retry'; retry.addEventListener('click', () => { const overlay = document.getElementById('mist-datapacks-browser'); if (overlay) loadDatapackResults(overlay); }); state.appendChild(retry); }
  return state;
}
async function loadDatapackResults(overlay) {
  const grid = overlay.querySelector('.mist-dp-grid');
  const query = overlay.querySelector('.mist-dp-search input').value.trim();
  grid.replaceChildren(datapackState('Searching Modrinth data packs…', false));
  try {
    const response = await window.mist.catalog.search({ source: 'modrinth', projectType: 'datapack', query, gameVersion: null, loader: null, category: null, sort: 'relevance', offset: 0, limit: 60 });
    const hits = (response && (response.hits || response.results)) || response || [];
    grid.replaceChildren();
    if (!hits.length) { grid.appendChild(datapackState(query ? 'No data packs match this search.' : 'No data packs found.', true)); return; }
    hits.forEach((project) => {
      const card = document.createElement('button');
      card.type = 'button'; card.className = 'mist-dp-card'; card.setAttribute('role', 'listitem');
      card.innerHTML = '<span class="mist-dp-card-icon"></span><span class="mist-dp-card-copy"><strong></strong><small></small></span><span class="mist-dp-card-foot"></span>';
      const icon = card.querySelector('.mist-dp-card-icon');
      if (project.iconUrl) { const img = document.createElement('img'); img.src = project.iconUrl; img.alt = ''; img.loading = 'lazy'; icon.appendChild(img); }
      else { const fallback = document.createElement('span'); fallback.className = 'mist-dp-fallback'; fallback.textContent = (project.title || '?').slice(0, 1).toUpperCase(); icon.appendChild(fallback); }
      card.querySelector('strong').textContent = project.title || 'Untitled';
      card.querySelector('small').textContent = project.author || 'Modrinth';
      const meta = [project.categories ? project.categories.slice(0, 2).join(' · ') : '', project.downloads ? `⬇ ${formatCount(project.downloads)}` : ''].filter(Boolean).join(' · ');
      card.querySelector('.mist-dp-card-foot').textContent = meta;
      card.addEventListener('click', () => openStandaloneProject(project, 'datapack'));
      grid.appendChild(card);
    });
  } catch (error) {
    grid.replaceChildren();
    grid.appendChild(datapackState(error instanceof Error ? error.message : 'Could not load data packs.', true));
  }
}
function ensureDatapacksBrowser() {
  let overlay = document.getElementById('mist-datapacks-browser');
  if (overlay) return overlay;
  overlay = document.createElement('div'); overlay.id = 'mist-datapacks-browser'; overlay.setAttribute('role', 'dialog'); overlay.setAttribute('aria-label', 'Data packs browser'); overlay.hidden = true;
  overlay.innerHTML = `<div class="mist-dp-shell"><header class="mist-dp-head"><button type="button" class="mist-dp-back" aria-label="Close data packs">${svg('back')}</button><div class="mist-dp-title"><span class="mist-dp-title-icon">${svg('routeDatapacks')}</span><div><strong>Data Packs</strong><small>Browse community data packs for your worlds</small></div></div><label class="mist-dp-search"><span>${svg('search')}</span><input type="search" placeholder="Search data packs…" aria-label="Search data packs"></label><button type="button" class="mist-dp-close" aria-label="Close">×</button></header><div class="mist-dp-body"><div class="mist-dp-grid" role="list"></div><div class="mist-dp-detail" hidden></div></div></div>`;
  document.body.appendChild(overlay);
  const close = () => { overlay.hidden = true; overlay.querySelector('.mist-dp-detail').hidden = true; overlay.querySelector('.mist-dp-body').classList.remove('is-detail'); };
  overlay.querySelector('.mist-dp-back').addEventListener('click', close);
  overlay.querySelector('.mist-dp-close').addEventListener('click', close);
  const search = overlay.querySelector('.mist-dp-search input');
  let timer;
  search.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(() => loadDatapackResults(overlay), 260); });
  search.addEventListener('keydown', (event) => { if (event.key === 'Enter') { clearTimeout(timer); loadDatapackResults(overlay); } });
  return overlay;
}
function openDatapacksBrowser() {
  closeStandaloneProject();
  const overlay = ensureDatapacksBrowser();
  overlay.hidden = false;
  overlay.querySelector('.mist-dp-detail').hidden = true;
  overlay.querySelector('.mist-dp-body').classList.remove('is-detail');
  loadDatapackResults(overlay);
}
function syncDataPacksNav(routeNav) {
  if (!routeNav) return;
  const items = [...routeNav.querySelectorAll('.top-route-item')];
  const target = items.find((item) => item.dataset.mistRouteGlyph === 'routeDatapacks');
  if (!target) return;
  if (target.title !== 'Data Packs') target.title = 'Data Packs';
  if (target.getAttribute('aria-label') !== 'Data Packs') target.setAttribute('aria-label', 'Data Packs');
  target.querySelectorAll('span').forEach((s) => { if (!s.children.length && /^worlds?$/i.test(s.textContent.trim())) s.textContent = 'Data Packs'; });
  if (target.dataset.mistDatapackWired === '1') return;
  target.dataset.mistDatapackWired = '1';
  target.addEventListener('click', (event) => {
    event.preventDefault(); event.stopImmediatePropagation();
    openDatapacksBrowser();
  }, true);
}

/* -------------------------------------------------------------- recently played */
function placeRecentlyPlayed(section) {
  document.querySelectorAll('.home-screen [style*="translate"]').forEach((el) => el.style.removeProperty('translate'));
  if (section !== undefined) return;
  const home = document.querySelector('.home-screen');
  const featured = home && home.querySelector('.home-featured-sidebar');
  const shiftEls = home ? [...home.querySelectorAll('.home-hero-playtime-card, .home-server-dock')] : [];
  const review = home && [...home.children].find((el) => el.tagName === 'SECTION' && el.id !== 'mist-recently-played');
  const set = (el, prop, value) => {
    if (!el) return;
    if (value == null) { if (el.style.getPropertyValue(prop)) el.style.removeProperty(prop); return; }
    if (el.style.getPropertyValue(prop) !== value) el.style.setProperty(prop, value, 'important');
  };
  const baseTop = (el) => el.getBoundingClientRect().top - (parseFloat(String(el.style.getPropertyValue('translate')).split(' ')[1]) || 0);
  if (!section || section.hidden || !featured || !section.isConnected) { shiftEls.forEach((el) => set(el, 'translate', null)); set(review, 'translate', null); return; }
  const fr = featured.getBoundingClientRect(), sr = section.getBoundingClientRect(), cs = getComputedStyle(section);
  const offTop = sr.top - (parseFloat(cs.top) || 0), offLeft = sr.left - (parseFloat(cs.left) || 0);
  set(section, 'top', `${Math.round(fr.bottom + 8 - offTop)}px`);
  set(section, 'left', `${Math.round(fr.left - offLeft)}px`);
  set(section, 'right', 'auto');
  set(section, 'width', `${Math.round(fr.width)}px`);
  const rpBottom = fr.bottom + 8 + sr.height;
  let lowest = 0;
  shiftEls.forEach((el) => {
    const top = baseTop(el);
    const need = top >= fr.bottom - 4 ? Math.max(0, Math.round(rpBottom + 8 - top)) : 0;
    set(el, 'translate', need ? `0px ${need}px` : null);
    lowest = Math.max(lowest, el.getBoundingClientRect().bottom);
  });
  if (review) { const need = Math.max(0, Math.round(lowest + 16 - baseTop(review))); set(review, 'translate', need ? `0px ${need}px` : null); }
}
let mistRpResizeT = 0;
window.addEventListener('resize', () => { clearTimeout(mistRpResizeT); mistRpResizeT = setTimeout(() => placeRecentlyPlayed(document.getElementById('mist-recently-played')), 120); });

function syncRecentlyPlayed(home) {
  let section = document.getElementById('mist-recently-played');
  if (!section) {
    section = document.createElement('section'); section.id = 'mist-recently-played'; section.setAttribute('aria-label', 'Recently played');
    section.innerHTML = '<header class="mist-rp-heading"><div><strong>Recently played</strong><small>Jump back into your latest worlds</small></div></header><div class="mist-rp-grid"></div>';
    document.body.appendChild(section);
  }
  if (!home) { section.hidden = true; section._mistWasHome = false; return; }
  const featured = document.querySelector('.home-featured-sidebar');
  const homeRoot = document.querySelector('.home-screen');
  if (featured && section.parentElement !== featured.parentElement && featured.parentElement) {
    featured.after(section);
  } else if (homeRoot && !featured && section.parentElement !== homeRoot) {
    homeRoot.appendChild(section);
  }
  const grid = section.querySelector('.mist-rp-grid');
  section.hidden = !grid.childElementCount;
  const refresh = () => {
    window.mist.installations.list().then((installations) => {
      if (!document.querySelector('.home-screen')) return;
      const played = [...installations]
        .filter((installation) => installation.lastPlayed)
        .sort((a, b) => new Date(b.lastPlayed).getTime() - new Date(a.lastPlayed).getTime())
        .slice(0, 6);
      if (!played.length) { section.hidden = true; placeRecentlyPlayed(section); return; }
      section.hidden = false;
      requestAnimationFrame(() => placeRecentlyPlayed(section));
      const signature = played.map((installation) => installation.id).join('|');
      if (grid.dataset.signature === signature) return;
      grid.dataset.signature = signature;
      grid.replaceChildren();
      played.forEach((installation) => {
        const card = document.createElement('button');
        card.type = 'button'; card.className = 'mist-rp-card';
        card.innerHTML = '<span class="mist-rp-art"></span><span class="mist-rp-copy"><strong></strong><small></small></span><span class="mist-rp-play">' + svg('play') + '</span>';
        card.querySelector('strong').textContent = installation.name;
        card.querySelector('small').textContent = `${timeAgoLabel(installation.lastPlayed)} · ${installation.gameVersion}`;
        const art = pdInstallArt(installation, 'mist-rp-art'); card.querySelector('.mist-rp-art').replaceWith(art);
        card.addEventListener('click', () => {
          r8PlayActive(installation);
        });
        grid.appendChild(card);
      });
    }).catch(() => {});
  };
  const now = Date.now();
  if (!section._mistWasHome || now - (section._mistAt || 0) > 15000) { section._mistWasHome = true; section._mistAt = now; refresh(); }
  placeRecentlyPlayed(section); clearTimeout(section._mistPlaceT); section._mistPlaceT = setTimeout(() => placeRecentlyPlayed(section), 900);
}

function start() {
  const schedule = () => window.requestAnimationFrame(installDock);
  schedule();
  let queued = false;
  const observer = new MutationObserver((records) => {
    if (location.hash.startsWith('#/bundles') && records.every(record => {
      const target = record.target.nodeType === 1 ? record.target : record.target.parentElement;
      return target?.closest('#mist-bundle-screen, .home-screen');
    })) return;
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
      syncInstallPicker();
    }, 50);
  });
  projectObserver.observe(document.body, { childList: true, subtree: true });
  document.addEventListener('click', (event) => {
  });
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true }); else start();
