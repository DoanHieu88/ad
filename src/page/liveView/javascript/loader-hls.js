import { commonJS } from "./common.js";
const {
  kProtoType_NONE: kProtoType_NONE$$module$Input_0,
  kProtoType_RTSP: kProtoType_RTSP$$module$Input_0,
  kProtoType_WS: kProtoType_WS$$module$Input_0,
  kProtoType_HTTP: kProtoType_HTTP$$module$Input_0,
  kProtoType_HTTP_M3U8: kProtoType_HTTP_M3U8$$module$Input_0,
  STREAM_TYPE_NONE: STREAM_TYPE_NONE$$module$Input_0,
  STREAM_TYPE_HLS: STREAM_TYPE_HLS$$module$Input_0,
  STREAM_TYPE_FLV: STREAM_TYPE_FLV$$module$Input_0,
  STREAM_TYPE_NALU: STREAM_TYPE_NALU$$module$Input_0,
  kReq_KFPT: kReq_KFPT$$module$Input_0,
  kStateDownloading: kStateDownloading$$module$Input_0,
  kStatePause: kStatePause$$module$Input_0,
  kStartStop: kStartStop$$module$Input_0,
  kStartResume: kStartResume$$module$Input_0,
  kStartMore: kStartMore$$module$Input_0,
  kGetFileInfoReq: kGetFileInfoReq$$module$Input_0,
  kDownloadFileReq: kDownloadFileReq$$module$Input_0,
  kReq_DownloadStart: kReq_DownloadStart$$module$Input_0,
  kReq_DownloadStop: kReq_DownloadStop$$module$Input_0,
  kReq_DownloadPause: kReq_DownloadPause$$module$Input_0,
  kReq_DownloadResume: kReq_DownloadResume$$module$Input_0,
  kReq_DownloadMore: kReq_DownloadMore$$module$Input_0,
  kGetFileInfoRsp: kGetFileInfoRsp$$module$Input_0,
  kFileData: kFileData$$module$Input_0,
  kUriData: kUriData$$module$Input_0,
  kDownLoaderError: kDownLoaderError$$module$Input_0,
  kDownloadStartRsp: kDownloadStartRsp$$module$Input_0,
  kUriDataFinished: kUriDataFinished$$module$Input_0,
  kUriDataError: kUriDataError$$module$Input_0,
  kRsp_DownloadStart: kRsp_DownloadStart$$module$Input_0,
  kRsp_DownloadStop: kRsp_DownloadStop$$module$Input_0,
  kRsp_DownloadPause: kRsp_DownloadPause$$module$Input_0,
  kRsp_DownloadResume: kRsp_DownloadResume$$module$Input_0,
  kRsp_DurationChange: kRsp_DurationChange$$module$Input_0,
  kRsp_ProfileData: kRsp_ProfileData$$module$Input_0,
  kUriDataCors: kUriDataCors$$module$Input_0,
  kRsp_DownloadChangeTime: kRsp_DownloadChangeTime$$module$Input_0,
  kRsp_FileTimeLength: kRsp_FileTimeLength$$module$Input_0,
  kRsp_DownloadMore: kRsp_DownloadMore$$module$Input_0,
  kReq_DecoderStart: kReq_DecoderStart$$module$Input_0,
  kReq_DecoderStop: kReq_DecoderStop$$module$Input_0,
  kReq_DecoderPause: kReq_DecoderPause$$module$Input_0,
  kReq_DecoderResume: kReq_DecoderResume$$module$Input_0,
  kReq_DecoderSeekTo: kReq_DecoderSeekTo$$module$Input_0,
  kFeedData: kFeedData$$module$Input_0,
  kDataFinished: kDataFinished$$module$Input_0,
  kReq_Profile: kReq_Profile$$module$Input_0,
  kReq_Auth: kReq_Auth$$module$Input_0,
  kReq_domain: kReq_domain$$module$Input_0,
  kReq_uuid: kReq_uuid$$module$Input_0,
  kReq_DecoderRunning: kReq_DecoderRunning$$module$Input_0,
  kReq_DecoderSkipTime: kReq_DecoderSkipTime$$module$Input_0,
  kRsp_DecoderStart: kRsp_DecoderStart$$module$Input_0,
  kRsp_DecoderStop: kRsp_DecoderStop$$module$Input_0,
  kRsp_DecoderPause: kRsp_DecoderPause$$module$Input_0,
  kRsp_DecoderResume: kRsp_DecoderResume$$module$Input_0,
  kVideoFrame: kVideoFrame$$module$Input_0,
  kAudioFrame: kAudioFrame$$module$Input_0,
  kVideoInfo: kVideoInfo$$module$Input_0,
  kAudioInfo: kAudioInfo$$module$Input_0,
  kFinishedEvt: kFinishedEvt$$module$Input_0,
  kRequestDataEvt: kRequestDataEvt$$module$Input_0,
  kRsp_DecoderSeekTo: kRsp_DecoderSeekTo$$module$Input_0,
  kDecoderDataFull: kDecoderDataFull$$module$Input_0,
  kDecoderDataMore: kDecoderDataMore$$module$Input_0,
  kWriteFrame: kWriteFrame$$module$Input_0,
  kAuthErr: kAuthErr$$module$Input_0,
  kVersion: kVersion$$module$Input_0,
  kReauth: kReauth$$module$Input_0,
  kAiFrame: kAiFrame$$module$Input_0,
  EE_Loader_OK: EE_Loader_OK$$module$Input_0,
  EE_Err_Loader_Param: EE_Err_Loader_Param$$module$Input_0,
  EE_Err_Loader_Busy: EE_Err_Loader_Busy$$module$Input_0,
  EE_Err_Loader_Timeout: EE_Err_Loader_Timeout$$module$Input_0,
  EE_Err_Loader_Net: EE_Err_Loader_Net$$module$Input_0,
  HLS_URL_TYPE_HLS: HLS_URL_TYPE_HLS$$module$Input_0,
  HLS_URL_TYPE_TS: HLS_URL_TYPE_TS$$module$Input_0,
  CallBack_Error: CallBack_Error$$module$Input_0,
  CallBack_Loading: CallBack_Loading$$module$Input_0,
  CallBack_Stop: CallBack_Stop$$module$Input_0,
  CallBack_Pause: CallBack_Pause$$module$Input_0,
  CallBack_Playing: CallBack_Playing$$module$Input_0,
  CallBack_Finished: CallBack_Finished$$module$Input_0,
  CallBack_DurationChange: CallBack_DurationChange$$module$Input_0,
  CallBack_ProgressChange: CallBack_ProgressChange$$module$Input_0,
  CallBack_AiInfo: CallBack_AiInfo$$module$Input_0,
  CallBack_Cors: CallBack_Cors$$module$Input_0,
  CallBack_Note: CallBack_Note$$module$Input_0,
  Loading_Note: Loading_Note$$module$Input_0,
  ProfileKey_Note: ProfileKey_Note$$module$Input_0,
  AuthKey_Note: AuthKey_Note$$module$Input_0,
  AuthURL_Note: AuthURL_Note$$module$Input_0,
  AuthRate_Default: AuthRate_Default$$module$Input_0,
  AuthRate_Error: AuthRate_Error$$module$Input_0,
  AuthRate_time: AuthRate_time$$module$Input_0,
  Error_Common: Error_Common$$module$Input_0,
  Error_Player_Loading: Error_Player_Loading$$module$Input_0,
  Error_Player_MAX: Error_Player_MAX$$module$Input_0,
  Error_Decoder_Init: Error_Decoder_Init$$module$Input_0,
  Error_Decoder_Open: Error_Decoder_Open$$module$Input_0,
  Error_Decoder_VideoInfo: Error_Decoder_VideoInfo$$module$Input_0,
  Error_Decoder_AudioInfo: Error_Decoder_AudioInfo$$module$Input_0,
  Error_Decoder_Auth: Error_Decoder_Auth$$module$Input_0,
  Error_Decoder_Start: Error_Decoder_Start$$module$Input_0,
  Error_Decoder_Pause: Error_Decoder_Pause$$module$Input_0,
  Error_Decoder_Resume: Error_Decoder_Resume$$module$Input_0,
  Error_Decoder_Stop: Error_Decoder_Stop$$module$Input_0,
  Error_Decoder_MAX: Error_Decoder_MAX$$module$Input_0,
  Error_DownLoader_FileInfo: Error_DownLoader_FileInfo$$module$Input_0,
  Error_Url_CORS: Error_Url_CORS$$module$Input_0,
  Error_Downloader_Start: Error_Downloader_Start$$module$Input_0,
  Error_Downloader_Stop: Error_Downloader_Stop$$module$Input_0,
  Error_Downloader_Pause: Error_Downloader_Pause$$module$Input_0,
  Error_Downloader_Resume: Error_Downloader_Resume$$module$Input_0,
  Error_Downloader_More: Error_Downloader_More$$module$Input_0,
  TRUE_XM: TRUE_XM$$module$Input_0,
  FALSE_XM: FALSE_XM$$module$Input_0,
  decoderStateIdle: decoderStateIdle$$module$Input_0,
  decoderStateInitializing: decoderStateInitializing$$module$Input_0,
  decoderStateReady: decoderStateReady$$module$Input_0,
  decoderStateFinished: decoderStateFinished$$module$Input_0,
  emState_Idle: emState_Idle$$module$Input_0,
  emState_Pausing: emState_Pausing$$module$Input_0,
  emState_Running: emState_Running$$module$Input_0,
  emState_Finished: emState_Finished$$module$Input_0,
  emState_Resume: emState_Resume$$module$Input_0,
  emPlayerState_Idle: emPlayerState_Idle$$module$Input_0,
  emPlayerState_Playing: emPlayerState_Playing$$module$Input_0,
  emPlayerState_Pausing: emPlayerState_Pausing$$module$Input_0,
  downloadSpeedByteRateCoef: downloadSpeedByteRateCoef$$module$Input_0,
  g_nTimeoutCount_Max: g_nTimeoutCount_Max$$module$Input_0,
  g_nTimeout_Default: g_nTimeout_Default$$module$Input_0,
  g_nInterval_Default: g_nInterval_Default$$module$Input_0,
  g_nIntervalDec_Default: g_nIntervalDec_Default$$module$Input_0,
  g_nBufferDuration_Default: g_nBufferDuration_Default$$module$Input_0,
  g_nChunkSize_Default: g_nChunkSize_Default$$module$Input_0,
  g_nSpeed_Default: g_nSpeed_Default$$module$Input_0,
  g_nLogLv_Default: g_nLogLv_Default$$module$Input_0,
  g_nLeftShiftBits_Default: g_nLeftShiftBits_Default$$module$Input_0,
  g_nRightShiftBits_Default: g_nRightShiftBits_Default$$module$Input_0,
  g_nMilliSecsOfBuff_Set: g_nMilliSecsOfBuff_Set$$module$Input_0,
  g_nMilliSecsOfBuff_Min_Default:
    g_nMilliSecsOfBuff_Min_Default$$module$Input_0,
  g_nMilliSecsOfBuff_Max_Default:
    g_nMilliSecsOfBuff_Max_Default$$module$Input_0,
  g_nLogLv_None: g_nLogLv_None$$module$Input_0,
  g_nLogLv_Error: g_nLogLv_Error$$module$Input_0,
  g_nLogLv_Info: g_nLogLv_Info$$module$Input_0,
  g_nLogLv_Debug: g_nLogLv_Debug$$module$Input_0,
  g_nLogLv_All: g_nLogLv_All$$module$Input_0,
  g_nDateStr_Default: g_nDateStr_Default$$module$Input_0,
  MAX_BUFFER_SIZE: MAX_BUFFER_SIZE$$module$Input_0,
  Logger: Logger$$module$Input_0,
} = commonJS;
function LoaderHLS$$module$Input_0() {
  this.szUrlHls = this.szUrlMain = null;
  this.listM3u8 = [];
  this.listTs = [];
  this.szUrlHeader = this.szTsHeader = null;
  this.nIndexM3u8 = this.nIndexTs_Sign = this.nIndexTs = 0;
  this.bIsStream = !0;
  this.szUrlTsLast = null;
  this.fDuration = this.fDurationSecs = 0;
  this.XmlHttp = this.fetchController = this.FetchHttp = null;
  this.nUrlType = HLS_URL_TYPE_HLS$$module$Input_0;
  this.bRequesting = !1;
  this.nTimeout = g_nTimeout_Default$$module$Input_0;
  this.nTimeoutCount = 0;
  this.timerRequest = null;
  this.nIntervalRequest = g_nInterval_Default$$module$Input_0;
  this.bFirstTime = !0;
}
LoaderHLS$$module$Input_0.prototype.fnParseLine = function (a, b) {
  let c = [],
    d = a.indexOf(b),
    g;
  for (; -1 != d; )
    (g = a.indexOf(b, d + 1)),
      -1 == g ? c.push(a.substring(d)) : c.push(a.substring(d, g)),
      (d = g);
  return c;
};
LoaderHLS$$module$Input_0.prototype.fnCallBack = function (a, b) {
  a = this.fnParseLine(a, "#");
  let c = [],
    d = [],
    g = 0;
  let n = /.m3u8/,
    p = /^#EXT-X-TARGETDURATION/,
    q = /^#EXTINF/,
    r = /^#EXT-X-STREAM-INF/,
    t = /^http/,
    u =
      /#EXTINF:\s*(\d*(?:\.\d+)?)(?:,[^\r\n]*[\r\n\s]+)?([^\r\n]*)(?:[\s\r\n]*)?/,
    v = b.substring(0, b.lastIndexOf("/") + 1);
  let m = this.nIndexTs_Sign;
  for (let k = 0; k < a.length; ++k) {
    var e = a[k];
    if (q.test(e)) {
      var f = e.replace("\r", "");
      /^#EXTINF:?([0-9\.]*)?,?(.*)?$/.exec(f);
      f = u.exec(e);
      e = parseFloat(f[1]);
      var h = f[2];
      f = !1;
      for (let l = m; l < this.listTs.length; ++l)
        if (h == this.listTs[l].f) {
          m = l;
          f = !0;
          break;
        }
      f
        ? 0 == k && (this.nIndexTs_Sign = m)
        : (0 == k && (this.nIndexTs_Sign = this.listTs.length),
          d.push({ d: e, f: h }),
          (g += e));
    } else if (p.test(e))
      (e = e.split(":")),
        2 == e.length &&
          ((e = parseFloat(e[1])),
          e > this.fDuration &&
            ((this.fDuration = e),
            (e = parseInt(1e3 * e)),
            self.postMessage({
              t: kRsp_DurationChange$$module$Input_0,
              n: e,
            })));
    else if (r.test(e))
      for (e = e.split("\n"), f = 1; f < e.length; ++f)
        (h = e[f]), n.test(h) && ((h = t.test(h) ? h : v + h), c.push(h));
  }
  0 < c.length &&
    (this.listM3u8[0] == b && this.listM3u8.splice(0, 1),
    (this.listM3u8 = c.concat(this.listM3u8)));
  0 < d.length &&
    ((this.listTs = this.listTs.concat(d)),
    (this.fDurationSecs += g),
    this.bFirstTime &&
      this.bIsStream &&
      ((this.nIndexTs = 0), (this.bFirstTime = !1)));
  self.postMessage({
    t: kRsp_FileTimeLength$$module$Input_0,
    d: this.fDurationSecs,
  });
};
LoaderHLS$$module$Input_0.prototype.fnStartTimer = function () {
  let a = this;
  this.timerRequest = setInterval(function () {
    a.fnOnRequest();
  }, this.nIntervalRequest);
};
LoaderHLS$$module$Input_0.prototype.fnStopTimer = function () {
  null != this.timerRequest &&
    (clearInterval(this.timerRequest), (this.timerRequest = null));
};
LoaderHLS$$module$Input_0.prototype.fnOnRequest = function () {
  this.nLastRecvTime > Date.now() + 5e3 &&
    this.postMessage({
      t: kCommonRsp,
      r: EE_Err_Loader_Timeout$$module$Input_0,
    });
  this.bRequesting ||
    (0 < this.listTs.length && this.nIndexTs < this.listTs.length
      ? this.fnRequest(
          this.listTs[this.nIndexTs].f,
          HLS_URL_TYPE_TS$$module$Input_0
        ) == EE_Loader_OK$$module$Input_0 &&
        (++this.nIndexTs, (this.nUrlType = HLS_URL_TYPE_TS$$module$Input_0))
      : !this.bIsStream && 0 < this.listTs.length
      ? (self.postMessage({ t: kUriDataFinished$$module$Input_0 }),
        this.fnPause())
      : 0 < this.listM3u8.length
      ? (this.nIndexM3u8 >= this.listM3u8.length && (this.nIndexM3u8 = 0),
        this.fnRequest(
          this.listM3u8[this.nIndexM3u8],
          HLS_URL_TYPE_HLS$$module$Input_0
        ) == EE_Loader_OK$$module$Input_0 &&
          (++this.nIndexM3u8,
          (this.nUrlType = HLS_URL_TYPE_HLS$$module$Input_0)))
      : (this.fnRequest(this.szUrlHls, HLS_URL_TYPE_HLS$$module$Input_0),
        (this.nUrlType = HLS_URL_TYPE_HLS$$module$Input_0)));
};
LoaderHLS$$module$Input_0.prototype.fnRequestM3u8 = function (a) {
  let b = (this.XmlHttp = this.fnCreateCORS("Get", a)),
    c = this;
  b.ontimeout = function () {
    ++c.nTimeoutCount;
    c.nTimeoutCount > g_nTimeoutCount_Max$$module$Input_0 &&
      self.postMessage({
        t: kUriDataError$$module$Input_0,
        r: EE_Err_Loader_Timeout$$module$Input_0,
      });
  };
  b.onreadystatechange = function () {
    b.readyState === XMLHttpRequest.DONE &&
      (200 === b.status
        ? c.fnCallBack(b.response, a)
        : self.postMessage({
            t: kUriDataError$$module$Input_0,
            r: EE_Err_Loader_Net$$module$Input_0,
          }),
      (c.bRequesting = !1));
  };
  b.onerror = function () {
    self.postMessage({
      t: kUriDataCors$$module$Input_0,
      r: Error_Url_CORS$$module$Input_0,
    });
  };
  b.responseType =
    HLS_URL_TYPE_HLS$$module$Input_0 == HLS_URL_TYPE_TS$$module$Input_0
      ? "arraybuffer"
      : "text";
  let d = a.indexOf("://");
  this.szUrlHeader = a.substring(0, a.indexOf("/", 0 > d ? 0 : d + 3));
  this.szTsHeader = a.substring(0, a.lastIndexOf("/") + 1);
  this.bRequesting = !0;
  b.timeout = this.nTimeout;
  b.send();
  return EE_Loader_OK$$module$Input_0;
};
function tenToSixteen$$module$Input_0(a) {
  a = a.toString(16);
  return "0x" + "00000000".substr(0, 8 - a.length) + a;
}
function tenToBinary$$module$Input_0(a) {
  a = a.toString(2);
  return "00000000".substr(0, 8 - a.length) + a;
}
LoaderHLS$$module$Input_0.prototype.fnCreateCORS = function (a, b) {
  null == this.XmlHttp
    ? (this.XmlHttp = new XMLHttpRequest())
    : this.XmlHttp.abort();
  let c = this.XmlHttp;
  "withCredentials" in c
    ? c.open(a, b, !0)
    : "undefined" != typeof XDomainRequest
    ? new XDomainRequest().open(a, b)
    : (c = null);
  return c;
};
LoaderHLS$$module$Input_0.prototype.fnRequestTs = function (a) {
  let b = a;
  /^http/.test(a) ||
    (b = "/" == a.charAt(0) ? this.szUrlHeader + a : this.szTsHeader + a);
  let c = this,
    d = this.fnCreateCORS("GET", b);
  d &&
    ((d.responseType = "arraybuffer"),
    (d.ontimeout = function () {
      ++c.nTimeoutCount;
      3 < c.nTimeoutCount &&
        self.postMessage({
          t: kUriDataError$$module$Input_0,
          r: EE_Err_Loader_Timeout$$module$Input_0,
        });
      --c.nIndexTs;
      c.bRequesting = !1;
      console.log("ontimeout:" + c.nIndexTs);
    }),
    (d.onreadystatechange = function () {
      d.readyState === XMLHttpRequest.DONE &&
        (200 === d.status
          ? downloader.reportData(d.response)
          : self.postMessage({
              t: kUriDataError$$module$Input_0,
              r: EE_Err_Loader_Net$$module$Input_0,
            }),
        (c.bRequesting = !1));
    }),
    (d.responseType = "arraybuffer"),
    (this.bRequesting = !0),
    (d.timeout = this.nTimeout),
    d.send(),
    (this.szUrlTsLast = b));
  return EE_Loader_OK$$module$Input_0;
};
LoaderHLS$$module$Input_0.prototype.fnRequest = function (a, b) {
  if (null == a) return Error_Loader_Param;
  if (this.bRequesting) return Error_Loader_Busy;
  switch (b) {
    case HLS_URL_TYPE_HLS$$module$Input_0:
      return this.fnRequestM3u8(a);
    case HLS_URL_TYPE_TS$$module$Input_0:
      return this.fnRequestTs(a);
  }
  return Error_Loader_Param;
};
LoaderHLS$$module$Input_0.prototype.fnInit = function (a, b, c) {
  if (null == a) return Error_Loader_Param;
  this.bIsStream = b;
  this.szUrlMain = a.substring(0, a.lastIndexOf("/") + 1);
  this.szUrlHls = a;
  this.nTimeout = c || g_nTimeout_Default$$module$Input_0;
  this.bFirstTime = !0;
  return EE_Loader_OK$$module$Input_0;
};
LoaderHLS$$module$Input_0.prototype.fnStart = function () {
  this.fnStartTimer();
  this.nLastRecvTime = Date.now();
};
LoaderHLS$$module$Input_0.prototype.fnPause = function () {
  this.fnStopTimer();
};
LoaderHLS$$module$Input_0.prototype.fnDestory = function () {
  this.fnStopTimer();
  this.listTs = this.listM3u8 = this.szUrlHls = this.szUrlMain = null;
  this.fDurationSecs = 0;
  this.fetchController &&
    (this.fetchController.abort(), (this.fetchController = null));
  this.FetchHttp = null;
  this.XmlHttp && (this.XmlHttp.abort(), (this.XmlHttp = null));
  this.nUrlType = HLS_URL_TYPE_HLS$$module$Input_0;
  this.bRequesting = !1;
  this.nTimeout = g_nTimeout_Default$$module$Input_0;
  this.nTimeoutCount = 0;
  this.nIntervalRequest = g_nInterval_Default$$module$Input_0;
};
LoaderHLS$$module$Input_0.prototype.fnJumpTime = function (a) {
  let b = 0,
    c = a.index;
  a = b.streamType;
  if (kProtoType_HTTP_M3U8$$module$Input_0 == a) {
    let d = 0;
    b = this.listTs.findIndex((g) => {
      d += g.d;
      return d > c;
    });
    console.log("=======\u65f6\u95f4\u8df3\u8f6c==ts==\u5e8f\u53f7====", b);
  } else kProtoType_HTTP$$module$Input_0 == a && (b = 0);
  this.bIsStream = !1;
  this.nIndexTs = b;
  this.fnStartTimer();
};
var module$Input_0 = {};
module$Input_0.LoaderHLS = LoaderHLS$$module$Input_0;
export { module$Input_0 as LoaderHLS };
