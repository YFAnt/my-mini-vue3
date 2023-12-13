const queue: Function[] = [];
const activePreFlushCbs: any = [];
let isFlushPending = false;

const p = Promise.resolve();
export function nextTick(fn?) {
  return fn ? p.then(fn) : p;
}

export function queueJobs(job) {
  if (!queue.includes(job)) {
    queue.push(job);
    queueFlush();
  }
}

function queueFlush() {
  if (isFlushPending) return;
  isFlushPending = true;
  nextTick(flushJobs);
}

export function queuePreFlushCb(cb) {
  queuecb(cb, activePreFlushCbs);
}
function queuecb(cb, activeQueue) {
  activeQueue.push(cb);
  queueFlush();
}

function flushJobs() {
  isFlushPending = false;
  flushPreFlushCbs();
  let job;
  while ((job = queue.shift())) {
    job && job();
  }
}
function flushPreFlushCbs() {
  // 执行所有的 pre 类型的 job
  for (let i = 0; i < activePreFlushCbs.length; i++) {
    activePreFlushCbs[i]();
  }
}
