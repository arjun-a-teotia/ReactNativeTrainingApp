import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';

import {Authority} from 'src/models';
import {AuthorityList} from '.';

describe('<AuthorityList />', () => {
  const authorities: Authority[] = [
    {
      id: 198,
      name: 'Aberdeenshire',
    },
    {
      id: 406,
      name: 'York',
    },
  ];

  it('renders message when authority list is empty', () => {
    const {getByText} = render(<AuthorityList authorities={[]} />);

    expect(getByText('No authorities found.')).toBeTruthy();
  });

  it.each(authorities)('renders authority list including "%s"', ({name}) => {
    const {getByText} = render(<AuthorityList authorities={authorities} />);

    expect(getByText(name)).toBeTruthy();
  });

  it.each(authorities)(
    'raises event when user selects authority "%j"',
    ({name}) => {
      const onSelectAuthority = jest.fn();
      const expectedAuthority = authorities.find(
        authority => authority.name === name,
      );

      const {getByText} = render(
        <AuthorityList
          authorities={authorities}
          onSelectAuthority={onSelectAuthority}
        />,
      );

      fireEvent.press(getByText(name));

      expect(onSelectAuthority).toHaveBeenCalledWith(expectedAuthority);
    },
  );
});
