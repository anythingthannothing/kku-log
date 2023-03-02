const appErrorHandler = (err, req, res, next) => {
  const now = new Date();
  const timestamp = `${now.toLocaleDateString(
    'ko-KR',
  )} ${now.toLocaleTimeString('ko-KR')}`;

  console.log(
    '\x1b[33m%s\x1b[0m',
    err.name,
    timestamp,
    req.url,
    req.method,
    err.stack.split('\n').slice(0, 3).join('\n'),
  );
  const {
    status = 500,
    message = '알 수 없는 오류가 발생했어요 :( 잠시 후에 다시 시도해 주세요!',
  } = err;

  return res.status(status).json({ status, message });
};

export { appErrorHandler };
