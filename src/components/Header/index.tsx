import logoImg from '../../assets/logo.svg'
import { Container, Content, Button } from './styles'

interface HeaderProps {
    onOpenNewTransactionModal: () => void;
}

export function Header({ onOpenNewTransactionModal }: HeaderProps) {
    
    return (
        <Container>
            <Content>
                <img src={logoImg} alt="dt money" />
                <Button type="button" onClick={onOpenNewTransactionModal}>Nova transação</Button>         
            </Content>
        </Container>
    )
}