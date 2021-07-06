import { cloneElement, ReactElement } from 'react';

import Link, { LinkProps } from 'next/link';

import { useRouter } from 'next/router';

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  shouldMatchExactHref?: boolean;
}

export function ActiveLink({
  children,
  shouldMatchExactHref = false,
  ...rest
}: ActiveLinkProps) {
  const { asPath } = useRouter();

  let isActive = false;

  const restHrefInString = String(rest.href);
  const restAsInString = String(rest.as);

  const linkExactlyTheSame =
    asPath === rest.href || asPath === rest.as;

  const linkStartsTheSame =
    asPath.startsWith(restHrefInString) ||
    asPath.startsWith(restAsInString);

  if (shouldMatchExactHref && linkExactlyTheSame) {
    isActive = true;
  }

  if (!shouldMatchExactHref && linkStartsTheSame) {
    isActive = true;
  }

  return (
    <Link {...rest}>
      {cloneElement(children, {
        color: isActive ? 'pink.400' : 'gray.50'
      })}
    </Link>
  );
}
