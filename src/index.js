import './canvas-polyfill';

function Watermask (settings = {}) {
  this.settings = Object.assign({
    text: 'watermask',
    mode: 'image',
    wrapper: document.body,
    space: 5,
    rotate: -45,
    fontSize: '16px',
    fontFamily: 'Microsoft YaHei',
    color: '#DDDDDD',
    textAlign: 'center',
    verticalAlign: 'middle',
    opacity: 1,
    onSuccess: () => {},
    onError: () => {}
  }, settings);

  if (!`${this.settings.fontSize}`.includes('px')) {
    console.log('fontSize add px unit');
    this.settings.fontSize = `${this.settings.fontSize}px`;
  }

  if (!this.settings.text) {
    console.warn('You must provide a text param to create watermask!');
    return;
  }

  if (!this.settings.space) {
    this.settings.space = 0;
  }

  this.settings.horizontalSpace = this.settings.horizontalSpace || this.settings.space;
  this.settings.verticalSpace = this.settings.verticalSpace || this.settings.space;

  this.init();
}

Watermask.prototype.init = function () {
  const { text } = this.settings;
  const { textWidth, textHeight, renderWidth, renderHeight, el } = this.getSizeByText(text);

  this.textWidth = textWidth;
  this.textHeight = textHeight;
  this.renderWidth = renderWidth;
  this.renderHeight = renderHeight;
  this.el = el;
  this.rows = 0;
  this.cols = 0;
  this.data = null;

  this.render();

  const self = this;
  window.onresize = function () {
    self.render();
  }
}

Watermask.prototype.render = function () {
  const { mode, text } = this.settings;
  if (mode === 'image') {
    this.createImageByText(text);
  } else {
    this.createHtmlByText(text);
  }
}

Watermask.prototype.getSizeByText = function (text) {
  const { verticalSpace, horizontalSpace, fontSize, fontFamily, rotate, color, textAlign, verticalAlign } = this.settings;
  const el = document.createElement('span');
  el.innerHTML = text;
  el.style.display = 'inline-block';
  el.style.padding = `${verticalSpace}px ${horizontalSpace}px`;
  el.style.textAlign = textAlign;
  el.style.verticalAlign = verticalAlign;
  el.style.fontSize = fontSize;
  el.style.fontFamily = fontFamily;
  el.style.color = color;
  el.style.opacity = 0;
  el.style.transform = `rotate(${rotate}deg)`;

  document.body.appendChild(el);

  const textWidth = el.offsetWidth;
  const textHeight = el.offsetHeight;
  el.style.width = `${textWidth}px`;
  el.style.height = `${textHeight}px`;

  const rect = el.getBoundingClientRect();
  const renderWidth = rect.right - rect.left;
  const renderHeight = rect.bottom - rect.top;

  document.body.removeChild(el);

  return { textWidth, textHeight, renderWidth, renderHeight, el };
}

Watermask.prototype.createImageByText = function (text) {
  const { rotate, fontSize, fontFamily, color, textAlign, verticalAlign, opacity, wrapper, onSuccess } = this.settings;
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const backingStore = context.backingStorePixelRatio ||
  context.webkitBackingStorePixelRatio ||
  context.mozBackingStorePixelRatio ||
  context.msBackingStorePixelRatio ||
  context.oBackingStorePixelRatio ||
  context.backingStorePixelRatio || 1;
  const pixelRatio = backingStore / (window.devicePixelRatio || 1); // ?????????????????????????????????
  const width = this.renderWidth * pixelRatio;
  const height = this.renderHeight * pixelRatio;

  canvas.width = this.canvasWidth = width;
  canvas.height = this.canvasHeight = height;

  canvas.getContext('2d'); // ??????context.backingStorePixelRatio????????????
  
  context.translate(width / 2, height / 2);
  context.rotate((rotate * Math.PI) / 180);
  context.scale(pixelRatio, pixelRatio);
  context.font = `${fontSize} ${fontFamily}`;
  context.fillStyle = color;
  context.textAlign = textAlign;
  context.textBaseline = verticalAlign;
  context.fillText(text, 0, 0);

  this.data = canvas.toDataURL('image/png', opacity);

  if (wrapper) {
    wrapper.style.backgroundImage = `url("${this.data}")`;
    wrapper.style.backgroundRepeat = 'repeat';
    wrapper.style.backgroundPosition = 'center';
    wrapper.style.backgroundSize = 'auto';
  }
  onSuccess(this.data);
}

Watermask.prototype.createHtmlByText = function (text) {
  const { opacity, space, wrapper, onSuccess } = this.settings;

  const body = document.body || document.documentElement;
  const width = this.renderWidth + space * 2;
  const height = this.renderWidth + space * 2;
  const cols = Number.parseInt(body.clientWidth / width);
  const rows = Number.parseInt(body.clientHeight / height);

  this.rows = rows + 2;
  this.cols = cols + 2;
  this.className = 'text-watermask';

  const fragment = document.createElement('div');
  fragment.className = this.className;
  fragment.style.position = 'absolute';
  fragment.style.top = '0';
  fragment.style.left = '0';
  fragment.style.zIndex = -1;
  fragment.style.width = '100%';
  fragment.style.height = '100%';
  fragment.style.overflow = 'hidden';

  for (let i = -1; i < this.rows - 1; i++) {
    const y = width * i;
    for (let j = -1; j < this.cols - 1; j++) {
      const x = height * j;
      const wrap = document.createElement('div');
      wrap.className = 'text-watermask-col'
      wrap.style.position = 'absolute';
      wrap.style.left = `${x}px`;
      wrap.style.top = `${y}px`;
      wrap.style.display = 'flex';
      wrap.style.justifyContent = 'center';
      wrap.style.alignItems = 'center';
      wrap.style.width = `${width}px`;
      wrap.style.height = `${height}px`;
      wrap.setAttribute('data-id', `${i}-${j}`);
      this.el.style.opacity = opacity;
      const node = this.el.cloneNode(true);
      wrap.appendChild(node);
      fragment.appendChild(wrap);
    };
  };

  this.data = fragment;

  if (wrapper) {
    const oldFrament = document.body.querySelector(`.${this.className}`);
    if (oldFrament) {
      wrapper.removeChild(oldFrament);
    }
    wrapper.appendChild(fragment);
  }

  onSuccess(this.data);
}

export default Watermask;