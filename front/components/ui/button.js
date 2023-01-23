import styles from './button.module.scss';
import Link from 'next/link';

export default function Button({title, href, classes, style}) {
  const reducer = (acc, curr) => `${acc} ${styles[curr]}`;
  const className = classes.split(' ').reduce(reducer, '');
  return (
    <Link href={href}>
      <a className={className} style={style}>{title}</a>
    </Link>
  )
}
