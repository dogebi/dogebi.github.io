// 업로드 화면과 OCR 결과 PDF의 미리보기 및 다운로드를 연결합니다.
const text = {
  'zh-CN': {
    title:'手绘图与建筑图纸对照', intro:'上传同一楼层的建筑图纸（PDF 或 PNG）和手绘图。对照文字，并在对齐后标记红色批注。',
    language:'语言', drawing:'建筑图纸', pdf:'图纸（PDF / PNG / JPEG / WebP）', page:'页码', sketch:'手绘图', image:'图片（PDF / PNG / JPEG / WebP）',
    compare:'识别并对照', download:'下载标注 PDF', drawingOnly:'仅在建筑图纸中识别到', sketchOnly:'仅在手绘图中识别到',
    clearAnchors:'清除定位点', anchorHelp:'在两张图上按相同顺序点击 3 个对应的角点。', anchorIncomplete:'请在两张图上各选 3 个点，或清除定位点以自动对齐。', marks:'投影的红色复核区域', unaligned:'无法可靠对齐红色批注。', noText:'可比较的文字不足。', busy:'正在识别并对照，请稍候。', ready:'对照完成。橙色框标记 PDF 中需要核对的文字。', same:'在已识别的文字中没有发现差异。', none:'无',
    invalidPlan:'无法读取左侧图纸。请选择有效的 PDF 或 PNG 文件。', invalidSketch:'无法读取右侧手绘图。请选择有效的 PNG、JPEG 或 WebP 文件。', invalidAnchors:'定位点无效，请清除后重新选择。', invalid:'无法读取文件，请检查文件格式。', badPage:'页码无效，或 PDF 有密码保护。', tooLarge:'文件总大小不能超过 32 MB。',
    noLabels:'至少一份文件未能可靠识别支持的房间名或尺寸。请检查清晰度及语言。', localOffline:'无法连接本机 OCR 服务。请启动 server.py，并在浏览器中允许访问本机。', localNotice:'识别由本机 OCR 服务处理。请先启动 server.py。', localApp:'打开本机应用', ocrFailed:'识别失败，请查看本地服务日志。',
    step1:'上传建筑图纸（PDF/PNG），选择页码', step2:'上传同一楼层的手绘图', step3:'需要精确对齐时，在两张图上各点 3 个对应角点', step4:'识别文字、对照差异，下载标注 PDF', themeDark:'深色', themeLight:'浅色'
  },
  ko: {
    title:'손그림과 건축 도면 대조', intro:'같은 층의 건축 도면(PDF 또는 PNG)과 손그림을 올립니다. 문자를 대조하고, 정렬한 뒤 빨간 검토 표시를 붙입니다.',
    language:'언어', drawing:'건축 도면', pdf:'도면(PDF / PNG / JPEG / WebP)', page:'페이지', sketch:'손그림', image:'이미지(PDF / PNG / JPEG / WebP)',
    compare:'인식해서 대조', download:'주석 PDF 내려받기', drawingOnly:'건축 도면에서만 인식됨', sketchOnly:'손그림에서만 인식됨',
    clearAnchors:'기준점 지우기', anchorHelp:'두 이미지에서 대응하는 모서리를 같은 순서로 3개 클릭합니다.', anchorIncomplete:'두 이미지에 각각 3개를 찍거나, 기준점을 지워 자동 정렬을 쓰세요.', marks:'도면에 옮긴 빨간 검토 영역', unaligned:'빨간 표시의 위치를 맞추지 못했습니다.', noText:'대조할 문자가 부족합니다.', busy:'인식과 대조를 진행 중입니다. 잠시 기다려 주세요.', ready:'대조를 마쳤습니다. 확인이 필요한 문자를 PDF에서 주황색으로 표시했습니다.', same:'인식된 문자 범위에서는 차이를 찾지 못했습니다.', none:'없음',
    invalidPlan:'왼쪽 도면을 읽지 못했습니다. 올바른 PDF 또는 PNG 파일을 고르세요.', invalidSketch:'오른쪽 손그림을 읽지 못했습니다. 올바른 PNG, JPEG, WebP 파일을 고르세요.', invalidAnchors:'기준점이 올바르지 않습니다. 지우고 다시 찍으세요.', invalid:'파일을 읽지 못했습니다. 형식을 확인하세요.', badPage:'페이지 번호가 잘못되었거나 PDF에 암호가 걸려 있습니다.', tooLarge:'파일 전체 크기는 32MB를 넘을 수 없습니다.',
    noLabels:'두 파일 중 적어도 하나에서 방 이름이나 치수를 안정적으로 인식하지 못했습니다. 선명도와 언어 설정을 확인하세요.', localOffline:'로컬 OCR 서비스에 연결하지 못했습니다. server.py를 실행하고 브라우저에서 로컬 접근을 허용하세요.', localNotice:'인식은 로컬 OCR 서비스가 처리합니다. 먼저 server.py를 실행하세요.', localApp:'로컬 앱 열기', ocrFailed:'인식에 실패했습니다. 로컬 서버 로그를 확인하세요.',
    step1:'건축 도면(PDF/PNG)을 올리고 페이지를 고릅니다', step2:'같은 층의 손그림을 올립니다', step3:'정확히 맞추려면 두 이미지에 대응하는 기준점 3개를 찍습니다', step4:'문자를 인식해 대조하고 주석 PDF를 내려받습니다', themeDark:'어둡게', themeLight:'밝게'
  },
  en: {
    title:'Sketch and drawing comparison', intro:'Upload the architectural drawing of one floor (PDF or PNG) and the hand sketch. Compare the labels, then mark the red review areas once the two are aligned.',
    language:'Language', drawing:'Architectural drawing', pdf:'Drawing (PDF / PNG / JPEG / WebP)', page:'Page', sketch:'Hand sketch', image:'Image (PDF / PNG / JPEG / WebP)',
    compare:'Recognise and compare', download:'Download annotated PDF', drawingOnly:'Only in the drawing', sketchOnly:'Only in the sketch',
    clearAnchors:'Clear anchors', anchorHelp:'Click three matching corners on both images, in the same order.', anchorIncomplete:'Pick three points on each image, or clear the anchors to align automatically.', marks:'Red review areas projected onto the drawing', unaligned:'The red marks could not be aligned reliably.', noText:'Not enough text to compare.', busy:'Recognising and comparing. This takes a moment.', ready:'Comparison finished. Text that needs checking is marked in orange in the PDF.', same:'No difference found in the recognised text.', none:'None',
    invalidPlan:'Could not read the drawing on the left. Choose a valid PDF or PNG file.', invalidSketch:'Could not read the sketch on the right. Choose a valid PNG, JPEG or WebP file.', invalidAnchors:'The anchors are not valid. Clear them and pick again.', invalid:'Could not read the file. Check its format.', badPage:'The page number is invalid, or the PDF is password protected.', tooLarge:'The files must total 32 MB or less.',
    noLabels:'At least one file did not yield reliable room names or dimensions. Check sharpness and the language setting.', localOffline:'Could not reach the local OCR service. Start server.py and allow local access in the browser.', localNotice:'Recognition runs on the local OCR service. Start server.py first.', localApp:'Open the local app', ocrFailed:'Recognition failed. Check the local server log.',
    step1:'Upload the drawing (PDF or PNG) and pick the page', step2:'Upload the hand sketch of the same floor', step3:'For exact alignment, click three matching corners on both images', step4:'Recognise the text, compare, and download the annotated PDF', themeDark:'Dark', themeLight:'Light'
  },

  ja: {
    title:'手描き図と建築図面の照合', intro:'同じ階の建築図面（PDF または PNG）と手描き画像をアップロードします。文字を照合し、位置合わせ後に赤い書き込みを示します。',
    language:'言語', drawing:'建築図面', pdf:'図面（PDF / PNG / JPEG / WebP）', page:'ページ番号', sketch:'手描き図', image:'画像（PDF / PNG / JPEG / WebP）',
    compare:'認識して照合', download:'注釈付き PDF をダウンロード', drawingOnly:'建築図面でのみ検出', sketchOnly:'手描き図でのみ検出',
    clearAnchors:'基準点をクリア', anchorHelp:'両方の画像で対応する角を同じ順番で 3 点クリックします。', anchorIncomplete:'両方の画像で 3 点ずつ選ぶか、基準点をクリアして自動位置合わせを行ってください。', marks:'図面に転写した赤い確認箇所', unaligned:'赤い書き込みの位置を合わせられませんでした。', noText:'照合可能な文字が不足しています。', busy:'認識と照合を実行中です。しばらくお待ちください。', ready:'照合が完了しました。確認が必要な文字を PDF 上でオレンジ色に表示しています。', same:'認識した文字の範囲では差異は見つかりませんでした。', none:'なし',
    invalidPlan:'左側の図面を開けません。有効な PDF または PNG を選択してください。', invalidSketch:'右側の手描き画像を開けません。有効な PNG、JPEG、WebP を選択してください。', invalidAnchors:'基準点が無効です。クリアして選び直してください。', invalid:'ファイルを読み込めません。形式を確認してください。', badPage:'ページ番号が無効か、PDF がパスワードで保護されています。', tooLarge:'ファイルの合計サイズは 32 MB 以下にしてください。',
    noLabels:'部屋名または寸法を十分に認識できませんでした。画像の鮮明さと言語設定をご確認ください。', localOffline:'ローカル OCR に接続できません。server.py を起動し、ブラウザでローカルアクセスを許可してください。', localNotice:'認識はローカル OCR サービスで実行します。先に server.py を起動してください。', localApp:'ローカルアプリを開く', ocrFailed:'認識に失敗しました。ローカルサーバーのログを確認してください。',
    step1:'建築図面（PDF/PNG）をアップロードし、ページを選びます', step2:'同じ階の手描き図をアップロードします', step3:'正確に合わせたいときは、両方の画像で対応する角を 3 点クリックします', step4:'文字を認識して差異を照合し、注釈付き PDF をダウンロードします', themeDark:'ダーク', themeLight:'ライト'
  }
};
const get = id => document.getElementById(id);
const hosted = location.origin === 'https://dogebi.github.io';
const loopback = 'http://127.0.0.1:8765';
const form = get('compare'), language = get('language');
const sketchPdf = get('sketch-pdf');
const isPdf = file => file?.type === 'application/pdf' || /\.pdf$/i.test(file?.name || '');
const drawing = get('drawing'), image = get('sketch-image'), download = get('download');
const sourcePreview = get('drawing-image');
const preference = 'sketch-cad-language';
const NAV = navigator.language.toLowerCase();
let locale = NAV.startsWith('ko') ? 'ko'
  : NAV.startsWith('en') ? 'en'
  : NAV.startsWith('ja') ? 'ja'
  : 'zh-CN';
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
  const themeBtn = get('theme-toggle');
  if (themeBtn) {
    const dark = document.documentElement.dataset.theme === 'dark';
    themeBtn.textContent = dark ? t.themeLight : t.themeDark;
    themeBtn.setAttribute('aria-pressed', String(dark));
  }
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
  const png = Boolean(blob && !isPdf(blob));
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

const themePreference = 'cad.theme';
get('theme-toggle').addEventListener('click', () => {
  const mode = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = mode;
  try { localStorage.setItem(themePreference, mode); } catch { /* 현재 화면에만 적용합니다. */ }
  render();
});

function reset() {
  result = undefined;
  statusKey = '';
  download.removeAttribute('href');
  const file = get('pdf').files[0];
  const png = !isPdf(file);
  sketchPdf.title = text[locale].sketch;
  get('page').readOnly = png;
  if (png) get('page').value = '1';
  showDrawing(file);
  render();
}

function renderAnchors() {
  const file = get('pdf').files[0];
  const sketch = get('image').files[0];
  const usable = file && !isPdf(file) && sketch && !isPdf(sketch) && !result;
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
for (const id of ['pdf','page','image','sketch-page']) {
  get(id).addEventListener('change', () => {
    if (id === 'pdf' || id === 'image') {
      anchors.plan = [];
      anchors.sketch = [];
    }
    reset();
  });
}
function showSketch() {
  if (imageUrl) URL.revokeObjectURL(imageUrl);
  const file = get('image').files[0];
  const pdf = isPdf(file);
  const page = get('sketch-page');
  page.readOnly = !pdf;
  if (!pdf) page.value = '1';
  imageUrl = file ? URL.createObjectURL(file) : '';
  image.hidden = !file || pdf;
  sketchPdf.hidden = !pdf;
  if (pdf) sketchPdf.src = imageUrl + '#page=' + page.valueAsNumber;
  else sketchPdf.removeAttribute('src');
  if (file && !pdf) image.src = imageUrl;
  else image.removeAttribute('src');
}
get('image').addEventListener('change', showSketch);
get('sketch-page').addEventListener('change', showSketch);
showSketch();

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
