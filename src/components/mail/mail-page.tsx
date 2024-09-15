import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import { Mail } from '@/components/mail/mail';
import { accounts, mails } from '@/data/data';


export default function MailPage() {
  const [defaultLayout, setDefaultLayout] = useState(undefined);
  const [defaultCollapsed, setDefaultCollapsed] = useState(undefined);

  useEffect(() => {
    const layout = Cookies.get('react-resizable-panels:layout');
    const collapsed = Cookies.get('react-resizable-panels:collapsed');

    const parseJSON = (value: string) => {
      try {
        return JSON.parse(value);
      } catch (e) {
        console.error('Failed to parse JSON:', e);
        return undefined;
      }
    };

    setDefaultLayout(layout ? parseJSON(layout) : undefined);
    setDefaultCollapsed(collapsed ? parseJSON(collapsed) : undefined);

    // Add the no-scroll class to the body when the component mounts
    document.body.classList.add('no-scroll');

    // Remove the no-scroll class when the component unmounts
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);


  return (
    <>
        <Mail
          accounts={accounts}
          mails={mails}
          defaultLayout={defaultLayout}
          defaultCollapsed={defaultCollapsed}
          navCollapsedSize={4}
        />
    </>
  );
}
