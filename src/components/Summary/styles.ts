import styled from "styled-components";

export const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem; //espaçamento do grid
    margin-top: -10rem;

    div { 
        background: var(--shape);
        padding: 1.5rem 2rem;
        border-radius: 0.25rem;
        color: var(--text-title);

        header { 
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        strong { 
            display: block; // por padrão o strong vem com display inline, nesse caso o margin-top não funciona.
            margin-top: 1rem;    
            font-size: 2rem;
            font-weight: 500;
            line-height: 3rem;
        }

        &.highlight-background {
            background: var(--green);
            color: #FFF;
        }
    }
`;