function buildSelectQuery({
  from,
  fields,
  joins = [],
  where,
  orderBy,
  limit,
}) {
  let params = [];

  // SELECT fields
  const selectFields = fields.map(f => {
    if (typeof f === 'string') return f;
    const [key, alias] = Object.entries(f)[0];
    return `${key} AS ${alias}`;
  }).join(', ');

  // FROM table
  let sql = `SELECT ${selectFields} FROM \`${from}\``;

  // JOINs
  for (const join of joins) {
    const type = join.type || 'LEFT';
    const table = `\`${join.table}\``;
    const alias = join.alias ? ` AS \`${join.alias}\`` : '';
    const [left, right] = join.on;
    sql += ` ${type} JOIN ${table}${alias} ON ${left} = ${right}`;
  }

  // WHERE
  if (where) {
    const whereClause = buildWhereClauseDSL(where);
    sql += ` WHERE ${whereClause.clause}`;
    params = params.concat(whereClause.values);
  }

  // ORDER BY
  if (orderBy) {
    const clause = Array.isArray(orderBy)
      ? orderBy.map(o => `${o.field} ${o.dir || 'ASC'}`).join(', ')
      : `${orderBy.field} ${orderBy.dir || 'ASC'}`;
    sql += ` ORDER BY ${clause}`;
  }

  // LIMIT
  if (typeof limit === 'number') {
    sql += ` LIMIT ${limit}`;
  }

  return { sql, params };
}

function buildWhereClauseDSL(condition) {
  const values = [];

  function parse(cond) {
    if (Array.isArray(cond)) {
      // Nested logic
      return '(' + cond.map(parse).join(' ') + ')';
    } else if (typeof cond === 'string') {
      // 'AND' | 'OR'
      return cond;
    } else if (cond.and) {
      return '(' + cond.and.map(parse).join(' AND ') + ')';
    } else if (cond.or) {
      return '(' + cond.or.map(parse).join(' OR ') + ')';
    } else {
      const [field, value] = Object.entries(cond)[0];
      if (value && typeof value === 'object' && 'op' in value) {
        values.push(value.value);
        return `${field} ${value.op} ?`;
      } else {
        values.push(value);
        return `${field} = ?`;
      }
    }
  }

  return { clause: parse(condition), values };
}

function buildInsertQuery(table, data) {
  const keys = [];
  const placeholders = [];
  const values = [];

  for (const key in data) {
    const value = data[key];
    if (value === undefined) continue;

    keys.push(`\`${key}\``);
    placeholders.push('?');
    values.push(value === null ? null : value);
  }

  const sql = `INSERT INTO \`${table}\` (${keys.join(', ')}) VALUES (${placeholders.join(', ')})`;
  return { sql, values };
}

function buildUpdateQuery(table, data, whereObj) {
  const setParts = [];
  const values = [];

  for (const key in data) {
    const value = data[key];
    if (value === undefined) continue;

    setParts.push(`\`${key}\` = ?`);
    values.push(value === null ? null : value);
  }

  const { clause: whereClause, values: whereValues } = buildWhereClause(whereObj);
  const sql = `UPDATE \`${table}\` SET ${setParts.join(', ')} WHERE ${whereClause}`;
  return { sql, values: [...values, ...whereValues] };
}

function buildDeleteQuery(table, whereObj) {
  const { clause, values } = buildWhereClause(whereObj);
  const sql = `DELETE FROM \`${table}\` WHERE ${clause}`;
  return { sql, values };
}

function buildWhereClause(whereObj, values = []) {
  if (typeof whereObj === 'string') {
    return { clause: whereObj, values };
  }

  if (Array.isArray(whereObj)) {
    const parts = [];
    for (let i = 0; i < whereObj.length; i++) {
      const item = whereObj[i];
      if (typeof item === 'string' && ['AND', 'OR'].includes(item.toUpperCase())) {
        parts.push(item.toUpperCase());
      } else {
        const { clause, values: innerValues } = buildWhereClause(item, []);
        parts.push(`(${clause})`);
        values.push(...innerValues);
      }
    }
    return { clause: parts.join(' '), values };
  }

  const parts = [];
  for (const key in whereObj) {
    const condition = whereObj[key];

    if (condition && typeof condition === 'object' && 'op' in condition) {
      const op = condition.op.toUpperCase();
      if (op === 'IS NULL' || op === 'IS NOT NULL') {
        parts.push(`\`${key}\` ${op}`);
      } else if (op === 'IN' && Array.isArray(condition.value)) {
        const placeholders = condition.value.map(() => '?').join(', ');
        parts.push(`\`${key}\` IN (${placeholders})`);
        values.push(...condition.value);
      } else {
        parts.push(`\`${key}\` ${op} ?`);
        values.push(condition.value);
      }
    } else {
      parts.push(`\`${key}\` = ?`);
      values.push(condition);
    }
  }

  return { clause: parts.join(' AND '), values };
}

module.exports = {
  buildSelectQuery,
  buildInsertQuery,
  buildUpdateQuery,
  buildDeleteQuery,
  buildWhereClause,
};