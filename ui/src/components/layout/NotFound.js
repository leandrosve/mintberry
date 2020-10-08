import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from 'bloomer/lib/layout/Container';
import { Title } from 'bloomer/lib/elements/Title';
import { Subtitle } from 'bloomer/lib/elements/Subtitle';
import { Icon } from 'bloomer/lib/elements/Icon';
 
const NotFound = () => {
    const {t} = useTranslation();
    return (
        <Container>
           <Title><span><Icon className="fas fa-bug"/> </span>{t("error.notFound")}</Title>
            <Subtitle>{t("error.resourceNotFound")}</Subtitle>
        </Container>
    );
}
 
NotFound.propTypes = {};
 
export default NotFound;