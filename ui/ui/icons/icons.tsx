/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { IconAnalytics } from './components/IconAnalytics';
import { IconAppleLogo } from './components/IconAppleLogo';
import { IconAreaIconNoUnder } from './components/IconAreaIconNoUnder';
import { IconAreaIcon } from './components/IconAreaIcon';
import { IconArrowDown } from './components/IconArrowDown';
import { IconArrowUp } from './components/IconArrowUp';
import { IconArrow } from './components/IconArrow';
import { IconAuto } from './components/IconAuto';
import { IconAwesomeOscillator } from './components/IconAwesomeOscillator';
import { IconBarIconNoUnder } from './components/IconBarIconNoUnder';
import { IconBarIcon } from './components/IconBarIcon';
import { IconBell } from './components/IconBell';
import { IconCamera } from './components/IconCamera';
import { IconCandleIconNoUnder } from './components/IconCandleIconNoUnder';
import { IconCandleIcon } from './components/IconCandleIcon';
import { IconCharts } from './components/IconCharts';
import { IconChat } from './components/IconChat';
import { IconCircle } from './components/IconCircle';
import { IconClocks } from './components/IconClocks';
import { IconCross } from './components/IconCross';
import { IconDealArrowDown } from './components/IconDealArrowDown';
import { IconDealArrowUp } from './components/IconDealArrowUp';
import { IconDepositCard } from './components/IconDepositCard';
import { IconDeposit } from './components/IconDeposit';
import { IconDocuments } from './components/IconDocuments';
import { IconDown } from './components/IconDown';
import { IconDownload } from './components/IconDownload';
import { IconEnvelope } from './components/IconEnvelope';
import { IconExchange } from './components/IconExchange';
import { IconExit } from './components/IconExit';
import { IconFacebook } from './components/IconFacebook';
import { IconFb } from './components/IconFb';
import { IconFinanceHistory } from './components/IconFinanceHistory';
import { IconFocus } from './components/IconFocus';
import { IconFractal } from './components/IconFractal';
import { IconFullscreen } from './components/IconFullscreen';
import { IconGlobe } from './components/IconGlobe';
import { IconGoogle } from './components/IconGoogle';
import { IconGplus } from './components/IconGplus';
import { IconHLine } from './components/IconHLine';
import { IconHome } from './components/IconHome';
import { IconIco } from './components/IconIco';
import { IconIndicatorAlligator } from './components/IconIndicatorAlligator';
import { IconIndicatorBollinger } from './components/IconIndicatorBollinger';
import { IconIndicatorMa } from './components/IconIndicatorMa';
import { IconIndicatorRsi } from './components/IconIndicatorRsi';
import { IconIndicator } from './components/IconIndicator';
import { IconIndicators } from './components/IconIndicators';
import { IconInfo } from './components/IconInfo';
import { IconInstagram } from './components/IconInstagram';
import { IconLayouts } from './components/IconLayouts';
import { IconLighting } from './components/IconLighting';
import { IconLineIconNoUnder } from './components/IconLineIconNoUnder';
import { IconLineIcon } from './components/IconLineIcon';
import { IconList } from './components/IconList';
import { IconLocation } from './components/IconLocation';
import { IconLogin } from './components/IconLogin';
import { IconMacd } from './components/IconMacd';
import { IconMagnifier } from './components/IconMagnifier';
import { IconMinus } from './components/IconMinus';
import { IconMobile } from './components/IconMobile';
import { IconMulti } from './components/IconMulti';
import { IconNeutral } from './components/IconNeutral';
import { IconNewspaper } from './components/IconNewspaper';
import { IconOk } from './components/IconOk';
import { IconPause } from './components/IconPause';
import { IconPen } from './components/IconPen';
import { IconPlay } from './components/IconPlay';
import { IconPlus } from './components/IconPlus';
import { IconPoint } from './components/IconPoint';
import { IconQuestion } from './components/IconQuestion';
import { IconRay } from './components/IconRay';
import { IconReload } from './components/IconReload';
import { IconRotateDevice } from './components/IconRotateDevice';
import { IconRouble } from './components/IconRouble';
import { IconSar } from './components/IconSar';
import { IconScheduler } from './components/IconScheduler';
import { IconSettings } from './components/IconSettings';
import { IconSocial } from './components/IconSocial';
import { IconSound } from './components/IconSound';
import { IconStar } from './components/IconStar';
import { IconSubtitles } from './components/IconSubtitles';
import { IconSuccess } from './components/IconSuccess';
import { IconSupport } from './components/IconSupport';
import { IconTimer } from './components/IconTimer';
import { IconTradeJournal } from './components/IconTradeJournal';
import { IconTrade } from './components/IconTrade';
import { IconTrash } from './components/IconTrash';
import { IconTwitter } from './components/IconTwitter';
import { IconUp } from './components/IconUp';
import { IconUser } from './components/IconUser';
import { IconVLine } from './components/IconVLine';
import { IconVk } from './components/IconVk';
import { IconWallet } from './components/IconWallet';
import { IconWithdraw } from './components/IconWithdraw';
export enum EIconName {
  Analytics,
  AppleLogo,
  AreaIconNoUnder,
  AreaIcon,
  ArrowDown,
  ArrowUp,
  Arrow,
  Auto,
  AwesomeOscillator,
  BarIconNoUnder,
  BarIcon,
  Bell,
  Camera,
  CandleIconNoUnder,
  CandleIcon,
  Charts,
  Chat,
  Circle,
  Clocks,
  Cross,
  DealArrowDown,
  DealArrowUp,
  DepositCard,
  Deposit,
  Documents,
  Down,
  Download,
  Envelope,
  Exchange,
  Exit,
  Facebook,
  Fb,
  FinanceHistory,
  Focus,
  Fractal,
  Fullscreen,
  Globe,
  Google,
  Gplus,
  HLine,
  Home,
  Ico,
  IndicatorAlligator,
  IndicatorBollinger,
  IndicatorMa,
  IndicatorRsi,
  Indicator,
  Indicators,
  Info,
  Instagram,
  Layouts,
  Lighting,
  LineIconNoUnder,
  LineIcon,
  List,
  Location,
  Login,
  Macd,
  Magnifier,
  Minus,
  Mobile,
  Multi,
  Neutral,
  Newspaper,
  Ok,
  Pause,
  Pen,
  Play,
  Plus,
  Point,
  Question,
  Ray,
  Reload,
  RotateDevice,
  Rouble,
  Sar,
  Scheduler,
  Settings,
  Social,
  Sound,
  Star,
  Subtitles,
  Success,
  Support,
  Timer,
  TradeJournal,
  Trade,
  Trash,
  Twitter,
  Up,
  User,
  VLine,
  Vk,
  Wallet,
  Withdraw,
}
interface IProps {
  name: EIconName;
  width: string;
  height: string;
  color: string;
  className?: string;
}

function getIcon(props: IProps) {
  const iconStyle = css`
    fill: ${props.color};
    display: inline-block;
  `;

  switch (props.name) {
    case EIconName.Analytics: {
      return (
        <IconAnalytics
          css={iconStyle}
          width={props.width}
          height={props.height}
        />
      );
    }
    case EIconName.AppleLogo: {
      return (
        <IconAppleLogo
          css={iconStyle}
          width={props.width}
          height={props.height}
        />
      );
    }
    case EIconName.AreaIconNoUnder: {
      return (
        <IconAreaIconNoUnder
          css={iconStyle}
          width={props.width}
          height={props.height}
        />
      );
    }
    case EIconName.AreaIcon: {
      return (
        <IconAreaIcon
          css={iconStyle}
          width={props.width}
          height={props.height}
        />
      );
    }
    case EIconName.ArrowDown: {
      return (
        <IconArrowDown
          css={iconStyle}
          width={props.width}
          height={props.height}
        />
      );
    }
    case EIconName.ArrowUp: {
      return (
        <IconArrowUp
          css={iconStyle}
          width={props.width}
          height={props.height}
        />
      );
    }
    case EIconName.Arrow: {
      return (
        <IconArrow css={iconStyle} width={props.width} height={props.height} />
      );
    }
    case EIconName.Auto: {
      return (
        <IconAuto css={iconStyle} width={props.width} height={props.height} />
      );
    }
    case EIconName.AwesomeOscillator: {
      return (
        <IconAwesomeOscillator
          css={iconStyle}
          width={props.width}
          height={props.height}
        />
      );
    }
    case EIconName.BarIconNoUnder: {
      return (
        <IconBarIconNoUnder
          css={iconStyle}
          width={props.width}
          height={props.height}
        />
      );
    }
    case EIconName.BarIcon: {
      return (
        <IconBarIcon
          css={iconStyle}
          width={props.width}
          height={props.height}
        />
      );
    }
    case EIconName.Bell: {
      return (
        <IconBell css={iconStyle} width={props.width} height={props.height} />
      );
    }
    case EIconName.Camera: {
      return (
        <IconCamera css={iconStyle} width={props.width} height={props.height} />
      );
    }
    case EIconName.CandleIconNoUnder: {
      return (
        <IconCandleIconNoUnder
          css={iconStyle}
          width={props.width}
          height={props.height}
        />
      );
    }
    case EIconName.CandleIcon: {
      return (
        <IconCandleIcon
          css={iconStyle}
          width={props.width}
          height={props.height}
        />
      );
    }
    case EIconName.Charts: {
      return (
        <IconCharts css={iconStyle} width={props.width} height={props.height} />
      );
    }
    case EIconName.Chat: {
      return (
        <IconChat css={iconStyle} width={props.width} height={props.height} />
      );
    }
    case EIconName.Circle: {
      return (
        <IconCircle css={iconStyle} width={props.width} height={props.height} />
      );
    }
    case EIconName.Clocks: {
      return (
        <IconClocks css={iconStyle} width={props.width} height={props.height} />
      );
    }
    case EIconName.Cross: {
      return (
        <IconCross css={iconStyle} width={props.width} height={props.height} />
      );
    }
    case EIconName.DealArrowDown: {
      return (
        <IconDealArrowDown
          css={iconStyle}
          width={props.width}
          height={props.height}
        />
      );
    }
    case EIconName.DealArrowUp: {
      return (
        <IconDealArrowUp
          css={iconStyle}
          width={props.width}
          height={props.height}
        />
      );
    }
    case EIconName.DepositCard: {
      return (
        <IconDepositCard
          css={iconStyle}
          width={props.width}
          height={props.height}
        />
      );
    }
    case EIconName.Deposit: {
      return (
        <IconDeposit
          css={iconStyle}
          width={props.width}
          height={props.height}
        />
      );
    }
    case EIconName.Documents: {
      return (
        <IconDocuments
          css={iconStyle}
          width={props.width}
          height={props.height}
        />
      );
    }
    case EIconName.Down: {
      return (
        <IconDown css={iconStyle} width={props.width} height={props.height} />
      );
    }
    case EIconName.Download: {
      return (
        <IconDownload
          css={iconStyle}
          width={props.width}
          height={props.height}
        />
      );
    }
    case EIconName.Envelope: {
      return (
        <IconEnvelope
          css={iconStyle}
          width={props.width}
          height={props.height}
        />
      );
    }
    case EIconName.Exchange: {
      return (
        <IconExchange
          css={iconStyle}
          width={props.width}
          height={props.height}
        />
      );
    }
    case EIconName.Exit: {
      return (
        <IconExit css={iconStyle} width={props.width} height={props.height} />
      );
    }
    case EIconName.Facebook: {
      return (
        <IconFacebook
          css={iconStyle}
          width={props.width}
          height={props.height}
        />
      );
    }
    case EIconName.Fb: {
      return (
        <IconFb css={iconStyle} width={props.width} height={props.height} />
      );
    }
    case EIconName.FinanceHistory: {
      return (
        <IconFinanceHistory
          css={iconStyle}
          width={props.width}
          height={props.height}
        />
      );
    }
    case EIconName.Focus: {
      return (
        <IconFocus css={iconStyle} width={props.width} height={props.height} />
      );
    }
    case EIconName.Fractal: {
      return (
        <IconFractal
          css={iconStyle}
          width={props.width}
          height={props.height}
        />
      );
    }
    case EIconName.Fullscreen: {
      return (
        <IconFullscreen
          css={iconStyle}
          width={props.width}
          height={props.height}
        />
      );
    }
    case EIconName.Globe: {
      return (
        <IconGlobe css={iconStyle} width={props.width} height={props.height} />
      );
    }
    case EIconName.Google: {
      return (
        <IconGoogle css={iconStyle} width={props.width} height={props.height} />
      );
    }
    case EIconName.Gplus: {
      return (
        <IconGplus css={iconStyle} width={props.width} height={props.height} />
      );
    }
    case EIconName.HLine: {
      return (
        <IconHLine css={iconStyle} width={props.width} height={props.height} />
      );
    }
    case EIconName.Home: {
      return (
        <IconHome css={iconStyle} width={props.width} height={props.height} />
      );
    }
    case EIconName.Ico: {
      return (
        <IconIco css={iconStyle} width={props.width} height={props.height} />
      );
    }
    case EIconName.IndicatorAlligator: {
      return (
        <IconIndicatorAlligator
          css={iconStyle}
          width={props.width}
          height={props.height}
        />
      );
    }
    case EIconName.IndicatorBollinger: {
      return (
        <IconIndicatorBollinger
          css={iconStyle}
          width={props.width}
          height={props.height}
        />
      );
    }
    case EIconName.IndicatorMa: {
      return (
        <IconIndicatorMa
          css={iconStyle}
          width={props.width}
          height={props.height}
        />
      );
    }
    case EIconName.IndicatorRsi: {
      return (
        <IconIndicatorRsi
          css={iconStyle}
          width={props.width}
          height={props.height}
        />
      );
    }
    case EIconName.Indicator: {
      return (
        <IconIndicator
          css={iconStyle}
          width={props.width}
          height={props.height}
        />
      );
    }
    case EIconName.Indicators: {
      return (
        <IconIndicators
          css={iconStyle}
          width={props.width}
          height={props.height}
        />
      );
    }
    case EIconName.Info: {
      return (
        <IconInfo css={iconStyle} width={props.width} height={props.height} />
      );
    }
    case EIconName.Instagram: {
      return (
        <IconInstagram
          css={iconStyle}
          width={props.width}
          height={props.height}
        />
      );
    }
    case EIconName.Layouts: {
      return (
        <IconLayouts
          css={iconStyle}
          width={props.width}
          height={props.height}
        />
      );
    }
    case EIconName.Lighting: {
      return (
        <IconLighting
          css={iconStyle}
          width={props.width}
          height={props.height}
        />
      );
    }
    case EIconName.LineIconNoUnder: {
      return (
        <IconLineIconNoUnder
          css={iconStyle}
          width={props.width}
          height={props.height}
        />
      );
    }
    case EIconName.LineIcon: {
      return (
        <IconLineIcon
          css={iconStyle}
          width={props.width}
          height={props.height}
        />
      );
    }
    case EIconName.List: {
      return (
        <IconList css={iconStyle} width={props.width} height={props.height} />
      );
    }
    case EIconName.Location: {
      return (
        <IconLocation
          css={iconStyle}
          width={props.width}
          height={props.height}
        />
      );
    }
    case EIconName.Login: {
      return (
        <IconLogin css={iconStyle} width={props.width} height={props.height} />
      );
    }
    case EIconName.Macd: {
      return (
        <IconMacd css={iconStyle} width={props.width} height={props.height} />
      );
    }
    case EIconName.Magnifier: {
      return (
        <IconMagnifier
          css={iconStyle}
          width={props.width}
          height={props.height}
        />
      );
    }
    case EIconName.Minus: {
      return (
        <IconMinus css={iconStyle} width={props.width} height={props.height} />
      );
    }
    case EIconName.Mobile: {
      return (
        <IconMobile css={iconStyle} width={props.width} height={props.height} />
      );
    }
    case EIconName.Multi: {
      return (
        <IconMulti css={iconStyle} width={props.width} height={props.height} />
      );
    }
    case EIconName.Neutral: {
      return (
        <IconNeutral
          css={iconStyle}
          width={props.width}
          height={props.height}
        />
      );
    }
    case EIconName.Newspaper: {
      return (
        <IconNewspaper
          css={iconStyle}
          width={props.width}
          height={props.height}
        />
      );
    }
    case EIconName.Ok: {
      return (
        <IconOk css={iconStyle} width={props.width} height={props.height} />
      );
    }
    case EIconName.Pause: {
      return (
        <IconPause css={iconStyle} width={props.width} height={props.height} />
      );
    }
    case EIconName.Pen: {
      return (
        <IconPen css={iconStyle} width={props.width} height={props.height} />
      );
    }
    case EIconName.Play: {
      return (
        <IconPlay css={iconStyle} width={props.width} height={props.height} />
      );
    }
    case EIconName.Plus: {
      return (
        <IconPlus css={iconStyle} width={props.width} height={props.height} />
      );
    }
    case EIconName.Point: {
      return (
        <IconPoint css={iconStyle} width={props.width} height={props.height} />
      );
    }
    case EIconName.Question: {
      return (
        <IconQuestion
          css={iconStyle}
          width={props.width}
          height={props.height}
        />
      );
    }
    case EIconName.Ray: {
      return (
        <IconRay css={iconStyle} width={props.width} height={props.height} />
      );
    }
    case EIconName.Reload: {
      return (
        <IconReload css={iconStyle} width={props.width} height={props.height} />
      );
    }
    case EIconName.RotateDevice: {
      return (
        <IconRotateDevice
          css={iconStyle}
          width={props.width}
          height={props.height}
        />
      );
    }
    case EIconName.Rouble: {
      return (
        <IconRouble css={iconStyle} width={props.width} height={props.height} />
      );
    }
    case EIconName.Sar: {
      return (
        <IconSar css={iconStyle} width={props.width} height={props.height} />
      );
    }
    case EIconName.Scheduler: {
      return (
        <IconScheduler
          css={iconStyle}
          width={props.width}
          height={props.height}
        />
      );
    }
    case EIconName.Settings: {
      return (
        <IconSettings
          css={iconStyle}
          width={props.width}
          height={props.height}
        />
      );
    }
    case EIconName.Social: {
      return (
        <IconSocial css={iconStyle} width={props.width} height={props.height} />
      );
    }
    case EIconName.Sound: {
      return (
        <IconSound css={iconStyle} width={props.width} height={props.height} />
      );
    }
    case EIconName.Star: {
      return (
        <IconStar css={iconStyle} width={props.width} height={props.height} />
      );
    }
    case EIconName.Subtitles: {
      return (
        <IconSubtitles
          css={iconStyle}
          width={props.width}
          height={props.height}
        />
      );
    }
    case EIconName.Success: {
      return (
        <IconSuccess
          css={iconStyle}
          width={props.width}
          height={props.height}
        />
      );
    }
    case EIconName.Support: {
      return (
        <IconSupport
          css={iconStyle}
          width={props.width}
          height={props.height}
        />
      );
    }
    case EIconName.Timer: {
      return (
        <IconTimer css={iconStyle} width={props.width} height={props.height} />
      );
    }
    case EIconName.TradeJournal: {
      return (
        <IconTradeJournal
          css={iconStyle}
          width={props.width}
          height={props.height}
        />
      );
    }
    case EIconName.Trade: {
      return (
        <IconTrade css={iconStyle} width={props.width} height={props.height} />
      );
    }
    case EIconName.Trash: {
      return (
        <IconTrash css={iconStyle} width={props.width} height={props.height} />
      );
    }
    case EIconName.Twitter: {
      return (
        <IconTwitter
          css={iconStyle}
          width={props.width}
          height={props.height}
        />
      );
    }
    case EIconName.Up: {
      return (
        <IconUp css={iconStyle} width={props.width} height={props.height} />
      );
    }
    case EIconName.User: {
      return (
        <IconUser css={iconStyle} width={props.width} height={props.height} />
      );
    }
    case EIconName.VLine: {
      return (
        <IconVLine css={iconStyle} width={props.width} height={props.height} />
      );
    }
    case EIconName.Vk: {
      return (
        <IconVk css={iconStyle} width={props.width} height={props.height} />
      );
    }
    case EIconName.Wallet: {
      return (
        <IconWallet css={iconStyle} width={props.width} height={props.height} />
      );
    }
    case EIconName.Withdraw: {
      return (
        <IconWithdraw
          css={iconStyle}
          width={props.width}
          height={props.height}
        />
      );
    }
    default: {
      return null;
    }
  }
}

export const Icon: React.FC<IProps> = props => {
  return (
    <span
      css={css`
        width: ${props.width};
        height: ${props.height};
        line-height: ${props.height};
        display: inline-block;
      `}
      className={props.className}
    >
      {getIcon(props)}
    </span>
  );
};
