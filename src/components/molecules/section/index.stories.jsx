import Heading from 'components/atoms/heading';
import Text from 'components/atoms/text';
import React from 'react';
import Section from '.';

export default {
  title: 'components/molecules/Section',
  component: Section,
  parameters: {
    paddings: {
      default: 'small',
    },
    backgrounds: {
      default: 'gray',
    },
  },
};

const Template = args => <Section {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  children: (
    <>
      <Heading useDiv>Condolence contact</Heading>
      <Text>
        We would like to express our deepest condolences for the news of the death. For those who have lost close
        relatives, we are asking for information on contact information, funerals, etc. that can be contacted below for
        adjustment of condolence leave (or special leave).
      </Text>
    </>
  ),
};

export const Border = Template.bind({});
Border.args = {
  modifiers: 'border',
  children: (
    <>
      <Heading useDiv>Condolence contact</Heading>
      <Text>
        We would like to express our deepest condolences for the news of the death. For those who have lost close
        relatives, we are asking for information on contact information, funerals, etc. that can be contacted below for
        adjustment of condolence leave (or special leave).
      </Text>
    </>
  ),
};

export const CardBorder = Template.bind({});
CardBorder.args = {
  modifiers: 'card-border',
  children: (
    <>
      <Heading tag="h3">Condolence contact</Heading>
      <Text>
        We would like to express our deepest condolences for the news of the death. For those who have lost close
        relatives, we are asking for information on contact information, funerals, etc. that can be contacted below for
        adjustment of condolence leave (or special leave).
      </Text>
    </>
  ),
};

export const Card = Template.bind({});
Card.args = {
  modifiers: 'card',
  children: (
    <>
      <Heading tag="h2">Condolence contact</Heading>
      <Text>
        We would like to express our deepest condolences for the news of the death. For those who have lost close
        relatives, we are asking for information on contact information, funerals, etc. that can be contacted below for
        adjustment of condolence leave (or special leave).
      </Text>
    </>
  ),
};

export const Fill = Template.bind({});
Fill.args = {
  modifiers: 'fill',
  children: (
    <>
      <Heading tag="h2">Condolence contact</Heading>
      <Text>
        We would like to express our deepest condolences for the news of the death. For those who have lost close
        relatives, we are asking for information on contact information, funerals, etc. that can be contacted below for
        adjustment of condolence leave (or special leave).
      </Text>
    </>
  ),
};

export const FillWhite = Template.bind({});
FillWhite.args = {
  modifiers: 'fill-white',
  children: (
    <>
      <Heading tag="h2">Condolence contact</Heading>
      <Text>
        We would like to express our deepest condolences for the news of the death. For those who have lost close
        relatives, we are asking for information on contact information, funerals, etc. that can be contacted below for
        adjustment of condolence leave (or special leave).
      </Text>
    </>
  ),
};

export const FullPage = Template.bind({});
FullPage.args = {
  modifiers: 'fullpage',
  children: (
    <>
      <Heading tag="h2">Condolence contact</Heading>
      <Text>
        We would like to express our deepest condolences for the news of the death. For those who have lost close
        relatives, we are asking for information on contact information, funerals, etc. that can be contacted below for
        adjustment of condolence leave (or special leave).
      </Text>
    </>
  ),
};

export const SideBySide = Template.bind({});
SideBySide.args = {
  modifiers: 'side-by-side',
  children: (
    <>
      <Heading tag="h2">Condolence contact</Heading>
      <Text>
        We would like to express our deepest condolences for the news of the death. For those who have lost close
        relatives, we are asking for information on contact information, funerals, etc. that can be contacted below for
        adjustment of condolence leave (or special leave).
      </Text>
    </>
  ),
};
