
export default function NavBar() {
    return (
        <div>
            <ul>
                <li>
                    <a href="/admin/alunos">Listar alunos</a>
                </li>
                
                <li>
                    <a href="/admin/register-user">Registrar</a>
                </li>

                <li>
                    <a href="/admin/aluno/edit">Editar Aluno</a>
                </li>

                <li>
                    <a href="/admin/professores">Lista de Professores</a>
                </li>
                <li>
                    <a href="/admin/professor/edit">Editar Professor</a>
                </li>
                <li>
                    <a href="/admin/cursos/registrar">Registra curso</a>
                </li>

                <li>
                    <a href="/admin/cursos">Lista de Cursos</a>
                </li>
                <li>
                    <a href='/admin/curso/edit'>Editar Curso</a>
                </li>
                <li>
                    <a href="/admin/notas">Lista de notas</a>
                </li>
                <li>
                    <a href="/admin/register">CRIAR ADM BUCETUDO</a>
                </li>

                <li>
                    <a href="/aluno/login">Login Aluno</a>
                </li>

                <li>
                    <a href="/aluno/nota">Nota Aluno</a>
                </li>

                <li>
                    <a href="/aluno">Ver Aluno</a>
                </li>
                <li>
                    <a href="/aluno/edit">Editar aluno individual</a>
                </li>

                <li>
                    <a href="/professor/login">Loguin Professor</a>
                </li>

                <li>
                    <a href="/professor">Ver Professor</a>
                </li>

                <li>
                    <a href="/professor/edit">Editar professor individual</a>
                </li>
                <li>
                    <a href="/professor/alunos">Listar seus alunos</a>
                </li>
            </ul>
        </div>
    )
}