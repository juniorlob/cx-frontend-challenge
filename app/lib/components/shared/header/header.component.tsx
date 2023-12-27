import { HeaderProps } from '@/lib/components/shared/header/header.types'
import styles from './header.module.css'
import Image from 'next/image'

const LOGO_WIDTH = 106
const LOGO_HEIGHT = 72
const IMAGE_ASPECT = LOGO_WIDTH / LOGO_HEIGHT
const NEW_SIZE = 0.8 / IMAGE_ASPECT

const Header = ({ children }: HeaderProps): JSX.Element => {
  return (
    <header className={styles.header} role="banner">
      <div className={styles.container}>
        <Image
          src="/logo_ml.png"
          alt="Mercado Livre Brasil - Onde comprar e vender de Tudo"
          width={LOGO_WIDTH * NEW_SIZE}
          height={LOGO_HEIGHT * NEW_SIZE}
        />

        {children}
      </div>
    </header>
  )
}
export default Header
