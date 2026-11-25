// 업로드 화면과 OCR 결과 PDF의 미리보기 및 다운로드를 연결합니다.
const text = {
  'zh-CN': {
    title:'手绘图与建筑图纸对照', intro:'上传同一楼层的建筑图纸（PDF 或 PNG）和手绘图。对照文字，并在对齐后标记红色批注。',
    language:'语言', drawing:'建筑图纸', pdf:'图纸（PDF / PNG）', page:'页码', sketch:'手绘图', image:'图片（PNG / JPEG / WebP）',
    compare:'识别并对照', download:'下载标注 PDF', drawingOnly:'仅在建筑图纸中识别到', sketchOnly:'仅在手绘图中识别到',
    clearAnchors:'清除定位点', anchorHelp:'在两张图上按相同顺序点击 3 个对应的角点。', anchorIncomplete:'请在两张图上各选 3 个点，或清除定位点以自动对齐。', marks:'投影的红色复核区域', unaligned:'无法可靠对齐红色批注。', noText:'可比较的文字不足。', busy:'正在识别并对照，请稍候。', ready:'对照完成。橙色框标记 PDF 中需要核对的文字。', same:'在已识别的文字中没有发现差异。', none:'无',
    invalidPlan:'无法读取左侧图纸。请选择有效的 PDF 或 PNG 文件。', invalidSketch:'无法读取右侧手绘图。请选择有效的 PNG、JPEG 或 WebP 文件。', invalidAnchors:'定位点无效，请清除后重新选择。', invalid:'无法读取文件，请检查文件格式。', badPage:'页码无效，或 PDF 有密码保护。', tooLarge:'文件总大小不能超过 32 MB。',
    noLabels:'至少一份文件未能可靠识别支持的房间名或尺寸。请检查清晰度及语言。', localOffline:'无法连接本机 OCR 服务。请启动 server.py，并在浏览器中允许访问本机。', localNotice:'识别由本机 OCR 服务处理。请先启动 server.py。', localApp:'打开本机应用', ocrFailed:'识别失败，请查看本地服务日志。'
  },
  ja: {
    title:'手描き図と建築図面の照合', intro:'同じ階の建築図面（PDF または PNG）と手描き画像をアップロードします。文字を照合し、位置合わせ後に赤い書き込みを示します。',
    language:'言語', drawing:'建築図面', pdf:'図面（PDF / PNG）', page:'ページ番号', sketch:'手描き図', image:'画像（PNG / JPEG / WebP）',
    compare:'認識して照合', download:'注釈付き PDF をダウンロード', drawingOnly:'建築図面でのみ検出', sketchOnly:'手描き図でのみ検出',
    clearAnchors:'基準点をクリア', anchorHelp:'両方の画像で対応する角を同じ順番で 3 点クリックします。', anchorIncomplete:'両方の画像で 3 点ずつ選ぶか、基準点をクリアして自動位置合わせを行ってください。', marks:'図面に転写した赤い確認箇所', unaligned:'赤い書き込みの位置を合わせられませんでした。', noText:'照合可能な文字が不足しています。', busy:'認識と照合を実行中です。しばらくお待ちください。', ready:'照合が完了しました。確認が必要な文字を PDF 上でオレンジ色に表示しています。', same:'認識した文字の範囲では差異は見つかりませんでした。', none:'なし',
    invalidPlan:'左側の図面を開けません。有効な PDF または PNG を選択してください。', invalidSketch:'右側の手描き画像を開けません。有効な PNG、JPEG、WebP を選択してください。', invalidAnchors:'基準点が無効です。クリアして選び直してください。', invalid:'ファイルを読み込めません。形式を確認してください。', badPage:'ページ番号が無効か、PDF がパスワードで保護されています。', tooLarge:'ファイルの合計サイズは 32 MB 以下にしてください。',
    noLabels:'部屋名または寸法を十分に認識できませんでした。画像の鮮明さと言語設定をご確認ください。', localOffline:'ローカル OCR に接続できません。server.py を起動し、ブラウザでローカルアクセスを許可してください。', localNotice:'認識はローカル OCR サービスで実行します。先に server.py を起動してください。', localApp:'ローカルアプリを開く', ocrFailed:'認識に失敗しました。ローカルサーバーのログを確認してください。'
  }
};
const get = id => document.getElementById(id);
const hosted = location.origin === 'https://dogebi.github.io';
const loopback = 'http://127.0.0.1:8765';
const form = get('compare'), language = get('language');
const drawing = get('drawing'), image = get('sketch-image'), download = get('download');
const sourcePreview = get('drawing-image');
const preference = 'sketch-cad-language';
let locale = navigator.language.toLowerCase().startsWith('ja') ? 'ja' : 'zh-CN';
let statusKey = '', result;
let drawingUrl, imageUrl;
const anchors = { plan: [], sketch: [] };

try {
  const saved = localStorage.getItem(preference);
  if (Object.hasOwn(text, saved)) locale = saved;
} catch { /* 브라우저 기본 언어를 사용합니다. */ }

function render() {
  const t = text[locale];
  document.documentElement.lang = locale;
  document.title = t.title;
  get('local-info').hidden = !hosted;
  get('local-app').href = loopback + '/';
  language.value = locale;
  drawing.title = t.drawing;
  sourcePreview.alt = t.drawing;
  image.alt = t.sketch;
  for (const node of document.querySelectorAll('[data-i18n]')) node.textContent = t[node.dataset.i18n];
  const summary = [t[statusKey]];
  if (result?.markCount) summary.push(t.marks + ' ' + result.markCount);
  if (result?.alignment === 'unaligned') summary.push(t.unaligned);
  if (result && !result.hasLabels) summary.push(t.noText);
  get('status').textContent = summary.filter(Boolean).join(' ');
  renderAnchors();
  get('results').hidden = !result;
  download.hidden = !result;
  if (!result) return;
  for (const [id, values] of [['drawing-only', result.drawingOnly], ['sketch-only', result.sketchOnly]]) {
    get(id).replaceChildren(...(values.length ? values : [t.none]).map(value => {
      const item = document.createElement('li');
      item.textContent = value;
      return item;
    }));
  }
}

function showDrawing(blob) {
  if (drawingUrl) URL.revokeObjectURL(drawingUrl);
  drawingUrl = blob ? URL.createObjectURL(blob) : '';
  const png = blob?.type === 'image/png' || /\.png$/i.test(blob?.name || '');
  sourcePreview.hidden = !png;
  drawing.hidden = !blob || png;
  if (png) sourcePreview.src = drawingUrl;
  else sourcePreview.removeAttribute('src');
  if (blob && !png) drawing.src = drawingUrl + '#page=' + get('page').valueAsNumber;
  else drawing.removeAttribute('src');
}

language.addEventListener('change', () => {
  locale = language.value;
  try { localStorage.setItem(preference, locale); } catch { /* 현재 화면에 적용합니다. */ }
  reset();
});

function reset() {
  result = undefined;
  statusKey = '';
  download.removeAttribute('href');
  const file = get('pdf').files[0];
  const png = file?.type === 'image/png' || /\.png$/i.test(file?.name || '');
  get('page').readOnly = png;
  if (png) get('page').value = '1';
  showDrawing(file);
  render();
}

function renderAnchors() {
  const file = get('pdf').files[0];
  const usable = (file?.type === 'image/png' || /\.png$/i.test(file?.name || ''))
    && get('image').files.length && !result;
  get('anchors').hidden = !usable;
  get('anchor-help').textContent = text[locale].anchorHelp + '  ' + anchors.plan.length + '/3 · ' + anchors.sketch.length + '/3';
  for (const [node, key] of [[sourcePreview,'plan'],[image,'sketch']]) {
    node.classList.toggle('picking', Boolean(usable));
    node.parentElement.querySelectorAll('.anchor-number').forEach(marker => marker.remove());
    if (!usable) continue;
    const area = node.getBoundingClientRect(), container = node.parentElement.getBoundingClientRect();
    anchors[key].forEach(([x,y], index) => {
      const marker = document.createElement('span');
      marker.className = 'anchor-number';
      marker.textContent = String(index + 1);
      marker.style.left = (area.left - container.left + x * area.width) + 'px';
      marker.style.top = (area.top - container.top + y * area.height) + 'px';
      node.parentElement.append(marker);
    });
  }
}

for (const [node, key] of [[sourcePreview,'plan'],[image,'sketch']]) {
  node.addEventListener('click', event => {
    if (get('anchors').hidden || get('submit').disabled || anchors[key].length >= 3) return;
    const area = node.getBoundingClientRect();
    anchors[key].push([(event.clientX-area.left)/area.width, (event.clientY-area.top)/area.height]);
    renderAnchors();
  });
  node.addEventListener('load', renderAnchors);
}
window.addEventListener('resize', renderAnchors);
get('clear-anchors').addEventListener('click', () => {
  anchors.plan = [];
  anchors.sketch = [];
  renderAnchors();
});
for (const id of ['pdf','page','image']) {
  get(id).addEventListener('change', () => {
    if (id !== 'page') {
      anchors.plan = [];
      anchors.sketch = [];
    }
    reset();
  });
}
get('image').addEventListener('change', () => {
  if (imageUrl) URL.revokeObjectURL(imageUrl);
  const file = get('image').files[0];
  image.hidden = !file;
  if (file) image.src = imageUrl = URL.createObjectURL(file);
  else image.removeAttribute('src');
});

form.addEventListener('submit', async event => {
  event.preventDefault();
  reset();
  const data = new FormData(form);
  data.set('locale', locale);
  if (anchors.plan.length || anchors.sketch.length) {
    if (anchors.plan.length !== 3 || anchors.sketch.length !== 3) {
      statusKey = 'anchorIncomplete';
      render();
      return;
    }
    data.set('anchors', JSON.stringify(anchors));
  }
  const controls = [language, ...form.querySelectorAll('input, button')];
  controls.forEach(control => { control.disabled = true; });
  statusKey = 'busy';
  render();
  try {
    const response = await fetch((hosted ? loopback : '') + '/compare', { method:'POST', body:data });
    const body = await response.json();
    if (!response.ok) {
      statusKey = Object.hasOwn(text[locale], body.error) ? body.error : 'ocrFailed';
      return;
    }
    const bytes = Uint8Array.from(atob(body.pdf), character => character.charCodeAt(0));
    showDrawing(new Blob([bytes], { type:'application/pdf' }));
    download.href = drawingUrl;
    result = body;
    statusKey = body.drawingOnly.length || body.sketchOnly.length || body.markCount ? 'ready' : 'same';
  } catch {
    statusKey = hosted ? 'localOffline' : 'ocrFailed';
  } finally {
    controls.forEach(control => { control.disabled = false; });
    render();
  }
});
render();
